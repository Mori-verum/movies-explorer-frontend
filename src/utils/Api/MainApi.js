class MainApi {
    constructor(config) {
        this._baseUrl = config.baseUrl;
    }

    _returnJson(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject("Ошибка:" + res.status);
    }

    _request(url, options) {
        return fetch(url, options).then(this._returnJson);
    }

    register(name, password, email) {
        return this._request(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, password, email })
        })
            .then((res) => {
                return res;
            })
            .catch((err) => console.log(err));
    }

    login(email, password) {
        return this._request(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((data) => {
                localStorage.setItem('token', data.token);
                return data;
            })
            .catch((err) => console.log(err));
    }

    getCurrentUser(token) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        .then((data) => data)
        .catch((err) => console.log(err));
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
    baseUrl: 'http://localhost:3000',
});