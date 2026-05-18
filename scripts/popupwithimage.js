import Popup from "./popup.js";
import { CSS_IMAGE_CAPTION, CSS_IMAGE_IMAGE } from "./utils.js";

export default class PopupWithImage extends Popup {
  open(name, link) {
    console.log(`PopupWithImage.open(). modal: ${this._selector}`);

    // Selección de elementos DOM del popup ver imágen ampliada
    const imageName = this._popup.querySelector(CSS_IMAGE_CAPTION);
    const imageElement = this._popup.querySelector(CSS_IMAGE_IMAGE);

    imageName.textContent = name;
    imageElement.src = link;
    imageElement.alt = name;

    //openModal(imageSection);
    super.open();
  }
}
