class PodcastAPIAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  
  // GET /users/google_signin/:google_id
  getUser(googleUserId) {
    return this._fetch(`${this.baseUrl}/users/google_signin/${googleUserId}`, {
      method: 'GET'
    })
  }
  
  // GET /users/:user_id/podcasts/search
  searchPodcasts(userId, term) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/search?term=${term}`, {
      method: 'GET'
    })
  }

  // GET /users/:user_id/podcasts/recent
  getRecentEpisodes(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/recent`, {
      method: 'GET'
    })
  }

  // GET /users/:user_id/podcasts/:id
  getPodcast(userId, slug) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/${slug}`, {
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

  // GET /users/:user_id/subscriptions/:id
  getSubscriptions(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts`, {
      method: 'GET'
    })
  }

  // POST /users/:user_id/subscriptions
  addSubscription(userId, data) {
    return this._fetch(`${this.baseUrl}/users/${userId}/subscriptions`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  // DELETE /users/:user_id/subscriptions/:id
  removeSubscription(userId, subscriptionId) {
    return fetch(`${this.baseUrl}/users/${userId}/subscriptions/${subscriptionId}`, {
      method: 'DELETE'
    })
  }

  // PLAYLISTS

  // GET /users/:user_id/playlists
  getPlaylists(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/playlists`, {
      method: 'GET'
    })
  }

  // POST /users/:user_id/playlists
  createPlaylist(userId, data) {
    return this._fetch(`${this.baseUrl}/users/${userId}/playlists`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  // DELETE /users/:user_id/playlists/:id
  removePlaylist(userId, playlistId) {
    return fetch(`${this.baseUrl}/users/${userId}/playlists/${playlistId}`, {
      method: 'DELETE'
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