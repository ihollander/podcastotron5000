class PodcastAPIAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  get authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.jwt) {
        return { 'Authorization': 'Bearer ' + user.jwt };
    } else {
        return {};
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

  // POST /login
  userSignIn(data) {
    return this._fetch(`${this.baseUrl}/login/`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }
  
  // GET /podcasts/search/:term
  searchPodcasts(term) {
    return this._fetch(`${this.baseUrl}/podcasts/search/${term}`, {
      method: 'GET',
      headers: {...this.authHeader}
    })
  }

  // GET /podcasts/:id
  getPodcast(slug) {
    return this._fetch(`${this.baseUrl}/podcasts/${slug}`, {
      method: 'GET',
      headers: {...this.authHeader}
    })
  }

  // GET /episodes/:id
  getEpisode(id) {
    return this._fetch(`${this.baseUrl}/episodes/${id}`, {
      method: 'GET',
      headers: {...this.authHeader}
    })
  }

  // SUBSCRIPTIONS

  // GET /podcasts
  getSubscriptions() {
    return this._fetch(`${this.baseUrl}/podcasts`, {
      method: 'GET',
      headers: {...this.authHeader}
    })
  }

  // POST /podcast/:podcast_id/subscribe
  addSubscription(podcastId) {
    return this._fetch(`${this.baseUrl}/podcasts/${podcastId}/subscription`, {
      method: 'POST',
      headers: {...this.authHeader}
    })
  }

  // DELETE /podcast/:podcast_id/subscribe
  removeSubscription(podcastId) {
    return fetch(`${this.baseUrl}/podcasts/${podcastId}/subscription`, {
      method: 'DELETE',
      headers: {...this.authHeader}
    })
  }

  // PLAYLISTS

  // GET /episodes
  getPlaylists() {
    return this._fetch(`${this.baseUrl}/episodes`, {
      method: 'GET',
      headers: {...this.authHeader}
    })
  }

  // POST /episodes/:episode_id/playlist
  createPlaylist(episodeId) {
    return this._fetch(`${this.baseUrl}/episodes/${episodeId}/playlist`, {
      method: 'POST',
      headers: {...this.authHeader}
    })
  }

  // DELETE /episodes/:episode_id/playlist
  removePlaylist(episodeId) {
    return fetch(`${this.baseUrl}/episodes/${episodeId}/playlist`, {
      method: 'DELETE',
      headers: {...this.authHeader}
    })
  }

  // GET /episodes/recent
  getRecentEpisodes(page) {
    return this._fetch(`${this.baseUrl}/episodes/recent?page=${page}`, {
      method: 'GET',
      headers: {...this.authHeader}
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