class MainApi {
    constructor(config) {
        this._baseUrl = config.baseUrl;
    }

    _returnJson(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    }

    _request(url, options) {
        return fetch(url, options).then(this._returnJson);
    }

    register(data) {
        return this._request(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    login(data) {
        return this._request(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((data) => {
                localStorage.setItem('token', data.token);
                return data;
            })
    }

    getCurrentUser(token) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
    }

    updateUserInfo(userData) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData)
        })
    }

    getSavedMovies() {
        return this._request(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    addMovie(movieData) {
        return this._request(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(movieData)
        })
    }

    deleteMovie(id) {
        return this._request(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
}

export const mainApi = new MainApi({
    // baseUrl: 'https://api.movie.stasy.nomoredomains.monster',
    baseUrl: 'http://localhost:3000',
});