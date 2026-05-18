export default class UserInfo {
  // #name = document.querySelector(this._nameSelector);
  // #description = document.querySelector(this._descriptionSelector);
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.nameSelector);
    this._descriptionElement = document.querySelector(
      selectors.descriptionSelector,
    );
  }

  getUserInfo() {
    // Devuelve un objeto con información sobre el usuario. Útil para casos en
    // los que es necesario mostrar los datos del usuario en el formulario abierto
    // return {
    //   name: this.#name.textContent,
    //   description: this.#description.textContent,
    // };
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo() {
    // Toma los datos del nuevo usuario y los agrega en la página
    // NOTA: ¿Agregar o actualizar a la página? solo hay uno, no se agregan usuarios a la página
  }
}
