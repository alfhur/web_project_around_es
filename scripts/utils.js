// Declaraciones de clases CSS
export const CSS_POPUP_DIV = ".popup";
export const CSS_POPUP_FORM = ".popup__form";
export const CSS_DISPLAY_POPUP = "popup_is-opened";
export const CSS_CLOSE_BUTTON = ".popup__close";
export const CSS_SUBMIT_BUTTON = ".popup__button";
export const CSS_INPUT_ELEMENT = ".popup__input";
export const CSS_INPUT_ERR_ELEMENT = ".popup__input-error";
export const CSS_INPUT_ERR_SUFIX = "-input-error";
export const CSS_HIGHLIGHT_INVALID_INPUT = ".popup__input_type_error";
export const CSS_DISPLAY_VALIDATION_MSG = "popup__input-error_active";

// Declaraciones de clases CSS para el perfil
export const CSS_PROFILE_TITLE = ".profile__title";
export const CSS_PROFILE_DESCRIPTION = ".profile__description";

// Declaraciones de clases CSS para las tarjetas
export const CSS_CARD_CONTAINER = ".cards__list";
export const CSS_CARD_TEMPLATE = "#card-template";
export const CSS_CARD = ".card";
export const CSS_TITLE = ".card__title";
export const CSS_IMAGE = ".card__image";
export const CSS_LIKE_BUTTON = ".card__like-button";
export const CSS_DELETE_BUTTON = ".card__delete-button";
export const CSS_DISPLAY_LIKE = "card__like-button_is-active";

// Declaraciones de clases CSS para el popup ver imágen ampliada
export const CSS_IMAGE_DIV = "#image-popup";
export const CSS_IMAGE_CAPTION = ".popup__caption";
export const CSS_IMAGE_IMAGE = ".popup__image";

// Declaraciones de clases CSS para el popup edición de perfil
export const CSS_EDIT_DIV = "#edit-popup";
export const CSS_EDIT_NAME = ".popup__input_type_name";
export const CSS_EDIT_DESCRIPTION = ".popup__input_type_description";

// Declaraciones de clases CSS para el popup nueva de tarjeta
export const CSS_NEW_DIV = "#new-card-popup";
export const CSS_NEW_NAME = ".popup__input_type_card-name";
export const CSS_NEW_LINK = ".popup__input_type_url";

/**************************************************************************
 * Funciones generales: abrir/cerrar popups (ventans modales)
 *************************************************************************/

function resetModal(popup) {
  /*
  Extra del Proyecto 9: Recomendación: Restablecer la validación de formularios
  Se limpian inputs y mensajes de validación cotenidos en la forma
  */

  const formInputs = popup.querySelectorAll(CSS_INPUT_ELEMENT);

  if (formInputs.length > 0) {
    // Se desactiva el boton submit
    const submitButton = popup.querySelector(CSS_SUBMIT_BUTTON);
    //toggleButtonState(formInputs, submitButton);
    submitButton.disabled = true;

    // Se inicializan spans para los mensajes de validación de los inputs
    const formInputErrors = popup.querySelectorAll(CSS_INPUT_ERR_ELEMENT);
    formInputErrors.forEach((errorSpan) => {
      errorSpan.textContent = "";
      errorSpan.classList.remove(CSS_DISPLAY_VALIDATION_MSG);
    });

    // Se inicializan inputs
    formInputs.forEach((input) => {
      input.value = "";
    });
  }
}
