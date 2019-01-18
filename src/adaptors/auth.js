import BaseApiAdaptor from './baseApiAdaptor'

class AuthAdaptor extends BaseApiAdaptor {

  googleAuth(data) {
    return fetch(`${this.baseUrl}/google_oauth/`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user.jwt) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      });
  }

  signUp(data) {
    return fetch(`${this.baseUrl}/users/`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user.jwt) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      });
  }

  login(data) {
    return fetch(`${this.baseUrl}/login/`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse)
      .then(user => {
        if (user.jwt) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthAdaptor();
