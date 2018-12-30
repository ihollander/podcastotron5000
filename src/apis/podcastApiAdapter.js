class PodcastAPIAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api/v1'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  
  getUser(googleUserId) {
    return this._fetch(`${this.baseUrl}/users/google_signin/${googleUserId}`, {
      method: 'GET'
    })
  }
  
  searchPodcasts(userId, term) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/search?term=${term}`, {
      method: 'GET'
    })
  }

  getPodcast(userId, slug) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/${slug}`, {
      method: 'GET'
    })
  }

  addSubscription(userId, data) {
    return this._fetch(`${this.baseUrl}/users/${userId}/subscriptions`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  removeSubscription(userId, subscriptionId) {
    return fetch(`${this.baseUrl}/users/${userId}/subscriptions/${subscriptionId}`, {
      method: 'DELETE'
    })
  }

  getSubscriptions(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts`, {
      method: 'GET'
    })
  }

  getRecentEpisodes(userId) {
    return this._fetch(`${this.baseUrl}/users/${userId}/podcasts/recent`, {
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