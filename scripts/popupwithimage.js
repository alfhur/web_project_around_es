import Popup from "./popup.js";
import { CSS_IMAGE_CAPTION, CSS_IMAGE_IMAGE } from "./utils.js";

export default class PopupWithImage extends Popup {
  // constructor(data, popupSelector) {
  //   super(popupSelector);
  //   this.#name = data.name;
  //   this.#link = data.link;
  // }

  open({ name, link }) {
    console.log(`PopupWithImage.open(). modal: ${this._selector}`);

    // Selección de elementos DOM del popup ver imágen ampliada
    const imageName = this._popup.querySelector(CSS_IMAGE_CAPTION);
    const imageElement = this._popup.querySelector(CSS_IMAGE_IMAGE);

    // Asignación de los datos recibidos en el parámetro a los elementos DOM
    imageName.textContent = name;
    imageElement.src = link;
    imageElement.alt = name;

    super.open();
  }
}
