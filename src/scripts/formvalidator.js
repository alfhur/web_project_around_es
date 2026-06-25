import {
  CSS_HIGHLIGHT_INVALID_INPUT,
  CSS_DISPLAY_VALIDATION_MSG,
  CSS_INPUT_ERR_SUFIX,
} from "./utils.js";

export default class FormValidator {
  constructor(selectors, popupSelector) {
    this._selectors = selectors;
    this._form = document.querySelector(popupSelector);
  }

  setEventListeners() {
    const inputs = this._form.querySelectorAll(
      this._selectors.css_input_element,
    );
    const submitButton = this._form.querySelector(
      this._selectors.css_submit_button,
    );
    if (inputs.length > 0) {
      this._addModalValidationListeners(inputs, submitButton);
    } else {
      console.log(`  Popup de consulta (sin captura de datos)`);
    }
  }

  hideInputErrors() {
    /*
  Extra del Proyecto 9: Recomendación: Restablecer la validación de formularios
  Se limpian inputs y mensajes de validación cotenidos en la forma
  */

    // Se desactiva el boton submit
    const submitButton = this._form.querySelector(
      this._selectors.css_submit_button,
    );
    submitButton.disabled = true;

    // Se inicializan spans para los mensajes de validación de los inputs
    const inputs = this._form.querySelectorAll(
      this._selectors.css_input_element,
    );
    inputs.forEach((input) => this._hideInputError(input));
  }

  /**************************************************************************
   * Funciones para Mostrar/ocultar mensajes de error a los inputs
   *************************************************************************/

  _showInputError(inputElement, validationMessage) {
    const spanInputErrorID = this._getInputTypeErrID(inputElement);
    const errorSpan = document.querySelector(spanInputErrorID);
    inputElement.classList.add(CSS_HIGHLIGHT_INVALID_INPUT);
    errorSpan.textContent = validationMessage;
    errorSpan.classList.add(CSS_DISPLAY_VALIDATION_MSG);
  }

  _hideInputError(inputElement) {
    const spanInputErrorID = this._getInputTypeErrID(inputElement);
    const errorSpan = document.querySelector(spanInputErrorID);
    inputElement.classList.remove(CSS_HIGHLIGHT_INVALID_INPUT);
    errorSpan.textContent = "";
    errorSpan.classList.remove(CSS_DISPLAY_VALIDATION_MSG);
  }

  _toggleButtonState(inputs, button) {
    const allValid = Array.from(inputs).every((input) => input.validity.valid);
    button.disabled = !allValid;
  }

  _getInputTypeErrID(inputElement) {
    // Regresa el nombre de la clase CSS que identifca
    // de manera unívoca al SPAN asociado a un INPUT
    // para mostrar sus mensajes de error/validación.
    //
    // Con el atributo "name" del INPUT, se crea
    // el nombre de clase CSS asignada al SPAN.
    return `.${inputElement.name}${CSS_INPUT_ERR_SUFIX}`;
  }

  /**************************************************************************
   * Funciones para verificar si un input o formulario es válido
   *************************************************************************/

  _addModalValidationListeners(inputElements, submitButton) {
    // Agrega el listener de validación a cada elemento input en inputElements
    inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input, inputElements, submitButton);
      });
    });
  }

  _validateInput(input, inputElements, submitButton) {
    // Se activa/desactiva el butón submit
    this._toggleButtonState(inputElements, submitButton);

    // Se valida el input y se muestra/oculta su mensaje de error
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }
}
