class MainApi {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
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
}


export const mainApi = new MainApi({
    baseUrl: 'http://localhost:3000',
});

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY4YjZkNzM2ODk1YWFkZGQyNzU0ZGMiLCJpYXQiOjE2ODg0OTU4ODYsImV4cCI6MTY4OTEwMDY4Nn0.GJCS4NEFJaEGGDWMJKcNpMDCw3yCAMx-BRO607Jyea0"