console.log("Script index.js conectado.");

// Declaraciones de clases CSS
const CSS_POPUP_DIV = "popup";
const CSS_POPUP_FORM = "popup__form";
const CSS_DISPLAY_POPUP = "popup_is-opened";
const CSS_CLOSE_BUTTON = "popup__close";
const CSS_SUBMIT_BUTTON = "popup__button";
const CSS_INPUT_ELEMENT = "popup__input";
const CSS_INPUT_ERR_ELEMENT = "popup__input-error";
const CSS_INPUT_ERR_SUFIX = "-input-error";
const CSS_HIGHLIGHT_INVALID_INPUT = "popup__input_type_error";
const CSS_DISPLAY_VALIDATION_MSG = "popup__input-error_active";

// Selección de elementos DOM
const popups = document.querySelectorAll(`.${CSS_POPUP_DIV}`);

// Selección de elementos DOM para la gestión de la plantilla de tarjeta
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Selección de elementos DOM relacionados con la visualización del perfil
const profileSection = document.querySelector(".profile");
const profileAddButton = profileSection.querySelector(".profile__add-button");
const profileEditButton = profileSection.querySelector(".profile__edit-button");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description",
);

// Selección de elementos DOM del popup edición de perfil
const editSection = document.querySelector("#edit-popup");
const editForm = editSection.querySelector(`.${CSS_POPUP_FORM}`);
const editNameInput = editForm.querySelector(".popup__input_type_name");
const editDescriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);

// Selección de elementos DOM del popup nueva de tarjeta
const newSection = document.querySelector("#new-card-popup");
const newForm = newSection.querySelector(`.${CSS_POPUP_FORM}`);
const newNameInput = newSection.querySelector(".popup__input_type_card-name");
const newLinkInput = newSection.querySelector(".popup__input_type_url");

// Selección de elementos DOM del popup ver imágen ampliada
const imageSection = document.querySelector("#image-popup");
const imageName = imageSection.querySelector(".popup__caption");
const imageElement = imageSection.querySelector(".popup__image");

let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/**************************************************************************
 * Funciones generales: sin categoría
 *************************************************************************/

function loadCards() {
  // Crea dinámicamente las tarjetas a mostrar a partir
  // de los datos en el array initialCards
  initialCards.forEach(function (card) {
    console.log("Card name: " + card.name + ", Card link: " + card.link);
    renderCard(card.name, card.link, cardsContainer);
  });
}

/**************************************************************************
 * Funciones generales: abrir/cerrar popups (ventans modales)
 *************************************************************************/

function toggleButtonState(inputs, button) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !allValid;
}

function resetModal(popup) {
  /*
  Se inicializa el estado de la forma en preparación para abrirse
  */

  // Se limpian inputs y mensajes de validación cotenidos en la forma
  const formInputs = popup.querySelectorAll(`.${CSS_INPUT_ELEMENT}`);

  if (formInputs.length > 0) {
    // Se desativa el boton submit
    const submitButton = popup.querySelector(`.${CSS_SUBMIT_BUTTON}`);
    //toggleButtonState(formInputs, submitButton);
    submitButton.disabled = true;

    // Se inicializan inputs y se limpian mensajes de validación
    formInputs.forEach((input) => {
      input.value = "";
      hideInputError(input);
    });
  }
}

function handleModalKeys(evt) {
  /*
 Paso 4. Cerrar la ventana emergente pulsando Esc
 */
  if (evt.key === "Escape") {
    // Recuperamos el popup (forma) abierto (la visible con la clase "popup_is-opened")
    const openedForm = document.querySelector(`.${CSS_DISPLAY_POPUP}`);
    if (openedForm) {
      closeModal(openedForm);
    }
  }
}

function handleModalClick(evt) {
  /*
  Paso 3. Cerrar la ventana emergente el hacer clic
  en la superposición

  Parámetros:
    * evtcurrentTarget -> el popup completo (.popup)
    * evt.target -> el elemento exacto donde se hace clic
    * 
  Si ambos son iguales, significa que se hizo clic en
  el fonodo (overlay), no dentro del contenido.
  */
  console.log(`handleModalClick(). target: ${evt.target}`);
  if (evt.target === evt.currentTarget) {
    console.log(`handleModalClick(). Cerrando popup`);
    closeModal(evt.currentTarget);
  }
}

function openModal(popup) {
  console.log("openModal(). Abriendo modal.");

  // Se agrega listener para cerrar el popup con la tecla Esc
  document.addEventListener("keydown", handleModalKeys);

  // Se muestra el popup
  popup.classList.add(CSS_DISPLAY_POPUP);

  // Se limpia la forma
  resetModal(popup);
}

function closeModal(popup) {
  console.log("closeModal(). Cerrando modal.");

  // Se cierra (oculta) el popup
  popup.classList.remove(CSS_DISPLAY_POPUP);

  // Se elimina listener para cerrar el popup con la tecla Esc
  document.removeEventListener("keydown", handleModalKeys);

  // Se limpia la forma, si la sección tiene una
  const form = popup.querySelector(`.${CSS_POPUP_FORM}`);
  if (form) {
    form.reset(); // No funciona
    form.checkValidity();
  }
}

function addModalValidationListeners(inputElements, submitButton) {
  inputElements.forEach(function (input) {
    input.addEventListener("input", () => {
      // Se activa/desactiva el butón submit
      toggleButtonState(inputElements, submitButton);

      // Se valida el input y se muestra/oculta su mensaje de error
      if (input.validity.valid) {
        let logMsg = `Validando input: ${input.name} -> OK.`;
        console.log(logMsg);
        hideInputError(input);
      } else {
        let logMsg = `Validando input: ${input.name} -> Error.`;
        console.log(logMsg);
        showInputError(input, input.validationMessage);
      }
    }); // input.addEventListener
  }); // inputElements.forEach
}

function initModals() {
  /*
  Carga a todas las ventanas emergentes (popups) los
  listeners necesarios para su funcionamiento:

    * Clic del mouse para cerrar el popup en cualquier area.
    * Clic al boton X para cerrar el popup.
    * Validar inputs y activar/desactivar butón submit.
  */

  console.log("initModals(). Inicia.");

  popups.forEach((popup) => {
    console.log(`  Configurando popup ${popup.id}`);

    // Cerrar con clic con overlay
    console.log(`  Agregando listener cerrar con clic: handleModalClick()`);
    popup.addEventListener("click", handleModalClick);

    // Cerrar con botón X
    console.log(`  Agregando listener cerrar con boton: callback anónimo`);
    const closeButton = popup.querySelector(`.${CSS_CLOSE_BUTTON}`);
    closeButton.addEventListener("click", function () {
      console.log("Cerrando popup.");
      closeModal(popup);
    });

    // Validación de los campos del formulario
    const inputs = popup.querySelectorAll(`.${CSS_INPUT_ELEMENT}`);
    const submitButton = popup.querySelector(`.${CSS_SUBMIT_BUTTON}`);
    if (inputs.length > 0) {
      console.log(`  Agregando listener validar captura de datos`);
      addModalValidationListeners(inputs, submitButton);
    } else {
      console.log(`  Popup de consulta (sin captura de datos)`);
    }
  });

  console.log("initModals(). Termina.");
}

/**************************************************************************
 * Funciones generales: validación de datos de entrada
 *  - Verificar si un input o formulario es válido
 *  - Mostrar/ocultar mensajes de error a los inputs
 *************************************************************************/

function getInputTypeErrID(inputElement) {
  // Regresa el nombre de la clase CSS que identifca
  // de manera unívoca al SPAN asociado a un INPUT
  // para mostrar sus mensajes de error/validación.
  //
  // Con el atributo "name" del INPUT, se crea
  // el nombre de clase CSS asignada al SPAN.
  return `.${inputElement.name}${CSS_INPUT_ERR_SUFIX}`;
}

function showInputError(inputElement, validationMessage) {
  const spanInputErrorID = getInputTypeErrID(inputElement);
  const errorSpan = document.querySelector(spanInputErrorID);
  inputElement.classList.add(CSS_HIGHLIGHT_INVALID_INPUT);
  errorSpan.textContent = validationMessage;
  errorSpan.classList.add(CSS_DISPLAY_VALIDATION_MSG);
}

function hideInputError(inputElement) {
  const spanInputErrorID = getInputTypeErrID(inputElement);
  const errorSpan = document.querySelector(spanInputErrorID);
  inputElement.classList.remove(CSS_HIGHLIGHT_INVALID_INPUT);
  errorSpan.textContent = "";
  errorSpan.classList.remove(CSS_DISPLAY_VALIDATION_MSG);
}

/**************************************************************************
 * Funciones y eventos para la sección profile
 *************************************************************************/

profileEditButton.addEventListener("click", function () {
  console.log("Abriendo popup de edición de perfil.");
  handleOpenEditModal();
});

profileAddButton.addEventListener("click", function () {
  console.log("Abriendo popup de creación de tarjeta.");
  openModal(newSection);
});

/**************************************************************************
 * Funciones y eventos para el popup de edición de perfil
 *************************************************************************/

function fillProfileForm() {
  console.log("fillProfileForm(). Cargando datos a edit-popup.");
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  console.log("handleProfileFormSubmit(). Guardando cambios en el perfil.");
  evt.preventDefault();

  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescriptionInput.value;

  closeModal(editSection);
  //editForm.reset();
}

function handleOpenEditModal() {
  console.log("handleOpenEditModal(). Abriendo edit-popup.");
  fillProfileForm();
  openModal(editSection);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

/**************************************************************************
 * Funciones para la creación y renderizado de tarjetas
 *************************************************************************/

function getCardElement(name, link) {
  console.log("getCardElement(). Creando tarjeta: " + name);

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardLikeButton.addEventListener("click", () => {
    console.log("Click botón 'Me gusta'");
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardDeleteButton.addEventListener("click", () => {
    console.log("Click botón 'Eliminar'");
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    console.log("Click botón 'Ver tarjeta'");
    imageName.textContent = name;
    imageElement.src = link;
    imageElement.alt = name;
    openModal(imageSection);
  });

  return cardElement;
}

function renderCard(name, link, cardContainer) {
  console.log(
    "renderCard(). Renderizando tarjeta con nombre: " +
      name +
      " y link: " +
      link,
  );

  const newCard = getCardElement(name, link);
  cardContainer.prepend(newCard);
}

/**************************************************************************
 * Funciones para la creación de tarjetas a través del popup de creación de tarjeta
 *************************************************************************/

function handleCardFormSubmit(evt) {
  console.log("handleCardFormSubmit(). Guardando nueva tarjeta.");
  evt.preventDefault();
  closeModal(newSection);
  const name = newNameInput.value;
  const link = newLinkInput.value;
  //newForm.reset();
  renderCard(name, link, cardsContainer);
}

newForm.addEventListener("submit", handleCardFormSubmit);

/**************************************************************************
 * Funciones para vista de una tarjeta específica en el popup de imagen ampliada
 *************************************************************************/

/**************************************************************************
 * Código para la inicialización de la página
 *************************************************************************/

// Crear y mostrar las tarjetas iniciales
loadCards();

// Inicializar las ventanas modales
initModals();
