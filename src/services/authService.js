class AuthService {
  constructor() {
    this.baseUrl = "http://localhost:4000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
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

  handleResponse(response) {
    return response
      .json()
      .then(json => (response.ok ? json : Promise.reject(json)));
  }
}

export default new AuthService();
