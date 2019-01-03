class PodcastAPIAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  
  // POST /users
  userCreate(data) {
    return this._fetch(`${this.baseUrl}/users/`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }
  
  // GET /podcasts/search/:term
  searchPodcasts(term) {
    return this._fetch(`${this.baseUrl}/podcasts/search/${term}`, {
      method: 'GET'
    })
  }

  // GET /podcasts/:id
  getPodcast(slug) {
    return this._fetch(`${this.baseUrl}/podcasts/${slug}`, {
      method: 'GET'
    })
  }

  // GET /episodes/:id
  getEpisode(id) {
    return this._fetch(`${this.baseUrl}/episodes/${id}`, {
      method: 'GET'
    })
  }

  // SUBSCRIPTIONS

  // GET /users/:user_id/podcasts
  getSubscriptions(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts`, {
      method: 'GET'
    })
  }

  // POST /users/:user_id/podcast/:podcast_id/subscribe
  addSubscription(userId, podcastId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/${podcastId}/subscription`, {
      method: 'POST'
    })
  }

  // DELETE /users/:user_id/podcast/:podcast_id/subscribe
  removeSubscription(userId, podcastId) {
    return fetch(`${this.baseUrl}/users/${userId}/podcasts/${podcastId}/subscription`, {
      method: 'DELETE'
    })
  }

  // PLAYLISTS

  // GET /users/:user_id/playlists
  getPlaylists(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/episodes`, {
      method: 'GET'
    })
  }

  // POST /users/:user_id/episodes/:episode_id/playlist
  createPlaylist(userId, episodeId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/episodes/${episodeId}/playlist`, {
      method: 'POST'
    })
  }

  // DELETE /users/:user_id/episodes/:episode_id/playlist
  removePlaylist(userId, episodeId) {
    return fetch(`${this.baseUrl}/users/${userId}/episodes/${episodeId}/playlist`, {
      method: 'DELETE'
    })
  }

  // GET /users/:user_id/episodes/recent
  getRecentEpisodes(userId, page) {
    return this._fetch(`${this.baseUrl}/users/${userId}/episodes/recent?page=${page}`, {
      method: 'GET'
    })
  }

  _fetch(endpoint, options) {
    return fetch(endpoint, options)
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          throw r
        }
      })
  }
}

export default new PodcastAPIAdapter()