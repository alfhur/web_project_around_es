export default class Api {
  #baseUrl;
  #token;
  #contentType;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#token = options.headers.authorization;
    this.#contentType = options.headers["content-type"];
  }

  #handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  #getHeaders() {
    // Regresa un objeto con la configuración mínima para realizar
    // llamadas Web API. Este objeto se pasa al segundo parámetro
    // de una llamada fecth.
    return {
      headers: {
        authorization: this.#token,
        "content-type": this.#contentType,
      },
    };
  }

  /**************************************************************
   * METODOS WEBAPI PARA EL PERFIL DEL USUARI0
   **************************************************************/

  getProfile() {
    const url = this.#baseUrl + "/users/me";
    const options = this.#getHeaders();
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  updateProfile(data) {
    const url = this.#baseUrl + "/users/me";
    const options = {
      method: "PATCH",
      ...this.#getHeaders(),
      body: JSON.stringify(data),
    };
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  updateAvatar(data) {
    const url = this.#baseUrl + "/users/me/avatar";
    const options = {
      method: "PATCH",
      ...this.#getHeaders(),
      body: JSON.stringify(data),
    };
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  /**************************************************************
   * METODOS WEBAPI PARA LAS TARJETAS
   **************************************************************/

  newCard(data) {
    const url = this.#baseUrl + "/cards/";
    const options = {
      method: "POST",
      ...this.#getHeaders(),
      body: JSON.stringify(data),
    };
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  likeCard(id, isLiked) {
    const url = this.#baseUrl + "/cards/" + id + "/likes";
    const useMethod = isLiked ? "PUT" : "DELETE";
    const options = {
      method: useMethod,
      ...this.#getHeaders(),
    };
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  deleteCard(id) {
    const url = this.#baseUrl + "/cards/" + id;
    const options = {
      method: "DELETE",
      ...this.#getHeaders(),
    };
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  getCards() {
    const url = this.#baseUrl + "/cards";
    const options = this.#getHeaders();
    return fetch(url, options).then((res) => this.#handleResponse(res));
  }

  /**************************************************************
   * OTROS MÉTODOS WEBAPI SIN CATEGORÍA
   **************************************************************/

  getInicialCards() {
    return Promise.all([this.getProfile(), this.getCards()]);
  }
}
