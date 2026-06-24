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
  }

  close() {
    console.log(`PopupWithForm.close(). modal: ${this._selector}`);
    super.close();
    this._form.reset();
    this.#formValidator.hideInputErrors();
  }

  setEventListeners() {
    console.log(`PopupWithForm.setEventListeners(). modal: ${this._selector}`);
    super.setEventListeners();

    const submitButton = this._form.querySelector(CSS_SUBMIT_BUTTON);

    // Listener para el botón submit con la función de callback recibida en el constructor
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const textoOriginalSubmitButton = submitButton.textContent;
      submitButton.textContent = "Guardando...";

      this._handleSubmit(this._getInputValues());

      this.close();
      this._form.reset();
      submitButton.textContent = textoOriginalSubmitButton;
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
    console.log(`PopupWithForm._getInputValues(). modal: ${this._selector}`);
    const inputs = this._form.querySelectorAll(CSS_INPUT_ELEMENT);
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value.trim();
    });
    console.log(
      `   PopupWithForm._getInputValues(). values: ${JSON.stringify(inputValues)}`,
    );
    return inputValues;
  }
}
