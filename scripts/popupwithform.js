import Popup from "./popup.js";
import { CSS_INPUT_ELEMENT } from "./utils.ja";

export default class PopupWithForm extends Card {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._handleSubmit = submitCallback;
  }

  close() {
    console.log(`PopupWithForm.close(). modal: ${this._selector}`);
    super.close();
    //this._popup.removeEventListener("submit");
    this._popup.reset();
  }

  setEventListeners() {
    console.log(`PopupWithForm.setEventListeners(). modal: ${this._selector}`);
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      this._handleSubmit(event);
    });
    // ¿evento click icono cerrar? -> está en la clase super
  }

  _getInputValues() {
    console.log(`PopupWithForm._getInputValues(). modal: ${this._selector}`);
    const inputs = this._popup.querySelectorAll(CSS_INPUT_ELEMENT);
    const inputValues = {};
    inputs.foreach((input) => {
      inputValues[input.name] = input.value;
    });
    // ¿y luego que se hacen con los datos?
    console.log(`PopupWithForm._getInputValues(). values: ${inputValues}`);
    return inputValues;
  }
}
