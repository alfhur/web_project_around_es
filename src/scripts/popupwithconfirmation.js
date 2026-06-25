import Popup from "./popup.js";
import { CSS_POPUP_FORM, CSS_SUBMIT_BUTTON } from "./utils.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(CSS_POPUP_FORM);
    this._handleSubmit = submitCallback;
  }

  open(objectReference) {
    super.open();
    this._objectReference = objectReference;
  }

  setEventListeners() {
    super.setEventListeners();

    // Listener para el botón submit con la función de callback recibida en el constructor
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._objectReference);
      this.close();
    });
  }
}
