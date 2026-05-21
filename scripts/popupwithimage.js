import Popup from "./popup.js";
import { CSS_IMAGE_CAPTION, CSS_IMAGE_IMAGE } from "./utils.js";

export default class PopupWithImage extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  //   this.close = this.close.bind(this);
  // }
  open(data) {
    console.log(`PopupWithImage.open(). modal: ${this._selector}`);

    // Selección de elementos DOM del popup ver imágen ampliada
    const imageName = this._popup.querySelector(CSS_IMAGE_CAPTION);
    const imageElement = this._popup.querySelector(CSS_IMAGE_IMAGE);

    // Asignación de los datos recibidos en el parámetro a los elementos DOM
    imageName.textContent = data.name;
    imageElement.src = data.link;
    imageElement.alt = data.name;

    super.open();
  }
}
