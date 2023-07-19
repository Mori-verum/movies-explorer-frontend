class MoviesApi {
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

    getAllMovies() {
        return this._request(`${this._baseUrl}/beatfilm-movies`, {
            method: "GET",
            headers: this.headers,
        })
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        "Content-Type": "application/json"
    }
});