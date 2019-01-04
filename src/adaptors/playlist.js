import BaseApiAdaptor from './baseApiAdaptor'

class PlaylistAdaptor extends BaseApiAdaptor {
  
  // GET /episodes
  getAll() {
    return fetch(`${this.baseUrl}/episodes`, {
      method: "GET",
      headers: { ...this.authHeader }
    }).then(this.handleResponse);
  }

  // GET /episodes/:id
  get(id) {
    return fetch(`${this.baseUrl}/episodes/${id}`, {
      method: "GET",
      headers: { ...this.authHeader }
    }).then(this.handleResponse);
  }

  // POST /episodes/:episode_id/playlist
  create(episodeId) {
    return fetch(`${this.baseUrl}/episodes/${episodeId}/playlist`, {
      method: "POST",
      headers: { ...this.authHeader }
    }).then(this.handleResponse);
  }

  // DELETE /episodes/:episode_id/playlist
  remove(episodeId) {
    return fetch(`${this.baseUrl}/episodes/${episodeId}/playlist`, {
      method: "DELETE",
      headers: { ...this.authHeader }
    });
  }
}

export default new PlaylistAdaptor();
