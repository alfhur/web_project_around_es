export default class UserInfo {
  #nameElement;
  #descriptionElement;
  #imageElement;

  constructor(selectors) {
    this.#nameElement = document.querySelector(selectors.name);
    this.#descriptionElement = document.querySelector(selectors.about);
    this.#imageElement = document.querySelector(selectors.avatar);
  }

  getUserInfo() {
    // Devuelve un objeto con información sobre el usuario. Útil para casos en
    // los que es necesario mostrar los datos del usuario en el formulario abierto
    return {
      name: this.#nameElement.textContent,
      about: this.#descriptionElement.textContent,
      avatar: this.#imageElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    // Toma los datos del nuevo usuario y los agrega en la página
    this.#nameElement.textContent = name;
    this.#descriptionElement.textContent = about;
    this.#imageElement.src = avatar;
  }
}
