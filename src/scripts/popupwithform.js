import Popup from "./popup.js";
import FormValidator from "./formvalidator.js";
import {
  CSS_POPUP_FORM,
  CSS_INPUT_ELEMENT,
  CSS_SUBMIT_BUTTON,
} from "./utils.js";

export default class PopupWithForm extends Popup {
  #formValidator;

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(CSS_POPUP_FORM);
    this._handleSubmit = submitCallback;
    this.saveButton = this._form.querySelector(CSS_SUBMIT_BUTTON);
  }

  saveButton() {
    return this.saveButton;
  }

  close() {
    super.close();
    this._form.reset();
    this.#formValidator.hideInputErrors();
    this.saveButton.textContent = "Guardar";
  }

  setEventListeners() {
    super.setEventListeners();

    // Listener para el botón submit con la función de callback recibida en el constructor
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this.saveButton.textContent = "Guardando...";
      this._handleSubmit(this._getInputValues());
    });

    // Listener para el botón X-Cerrar
    // Agregado en super.setEventListener

    // Listener para la validación de los campos de captura del formulario
    const popupSelectors = {
      css_input_element: CSS_INPUT_ELEMENT,
      css_submit_button: CSS_SUBMIT_BUTTON,
    };
    this.#formValidator = new FormValidator(popupSelectors, this._selector);
    this.#formValidator.setEventListeners();
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(CSS_INPUT_ELEMENT);
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value.trim();
    });
    return inputValues;
  }
}
