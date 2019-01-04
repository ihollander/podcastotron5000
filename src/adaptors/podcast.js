import BaseApiAdaptor from "./baseApiAdaptor";

class PodcastAdaptor extends BaseApiAdaptor {
  // GET /episodes/recent
  getRecentEpisodes(page) {
    return fetch(`${this.baseUrl}/episodes/recent?page=${page}`, {
      method: "GET",
      headers: { ...this.authHeader }
    }).then(this.handleResponse);
  }

  // GET /episodes/:id
  getPodcast(slug) {
    return fetch(`${this.baseUrl}/podcasts/${slug}`, {
      method: "GET",
      headers: { ...this.authHeader }
    }).then(this.handleResponse);
  }

  // GET /podcasts/search/:term
  searchPodcasts(term) {
    return fetch(`${this.baseUrl}/podcasts/search/${term}`, {
      method: "GET",
      headers: { ...this.authHeader }
    }).then(this.handleResponse);
  }
}

export default new PodcastAdaptor();
