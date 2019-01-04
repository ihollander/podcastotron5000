import BaseApiAdaptor from './baseApiAdaptor'

class SubscriptionAdaptor extends BaseApiAdaptor {

  // GET /podcasts
  getAll() {
    return fetch(`${this.baseUrl}/podcasts`, {
      method: 'GET',
      headers: {...this.authHeader}
    }).then(this.handleResponse);
  }

  // POST /podcast/:podcast_id/subscribe
  create(podcastId) {
    return fetch(`${this.baseUrl}/podcasts/${podcastId}/subscription`, {
      method: 'POST',
      headers: {...this.authHeader}
    }).then(this.handleResponse);
  }

  // DELETE /podcast/:podcast_id/subscribe
  remove(podcastId) {
    return fetch(`${this.baseUrl}/podcasts/${podcastId}/subscription`, {
      method: 'DELETE',
      headers: {...this.authHeader}
    })
  }
}

export default new SubscriptionAdaptor();
