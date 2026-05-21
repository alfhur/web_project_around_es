export default class UserInfo {
  #nameElement;
  #descriptionElement;

  constructor(nameSelector, descriptionSelector) {
    this.#nameElement = document.querySelector(nameSelector);
    this.#descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    // Devuelve un objeto con información sobre el usuario. Útil para casos en
    // los que es necesario mostrar los datos del usuario en el formulario abierto
    return {
      name: this.#nameElement.textContent,
      description: this.#descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    // Toma los datos del nuevo usuario y los agrega en la página
    this.#nameElement.textContent = name;
    this.#descriptionElement.textContent = description;
  }
}
