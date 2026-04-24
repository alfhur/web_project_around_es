console.log("Script index.js conectado.");

// Declaraciones de clases CSS
const CSS_POPUP_ELEMENT = "popup";
const CSS_OPEN_POPUP = "popup_is-opened";
const CSS_SUBMIT_BUTTON = "popup__button";
const CSS_INPUT_ELEMENT = "popup__input";
const CSS_INPUT_ERR_ELEMENT = "popup__input-error";
const CSS_INPUT_NAME_ERR_SUFIX = "-input-error";
const CSS_HIGHLIGHT_INVALID_INPUT = "popup__input_type_error";
const CSS_SHOW_VALIDATION_MSG = "popup__input-error_active";

// Selección de elementos DOM
const popups = document.querySelectorAll(`.${CSS_POPUP_ELEMENT}`);

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
const editForm = editSection.querySelector(".popup__form");
const editFormInputs = editSection.querySelectorAll(`.${CSS_INPUT_ELEMENT}`);
const editCloseButton = editSection.querySelector(".popup__close");
const editSubmitButton = editForm.querySelector(`.${CSS_SUBMIT_BUTTON}`);
const editNameInput = editForm.querySelector(".popup__input_type_name");
const editDescriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);

// Selección de elementos DOM del popup nueva de tarjeta
const newSection = document.querySelector("#new-card-popup");
const newForm = newSection.querySelector(".popup__form");
const newFormInputs = newSection.querySelectorAll(`.${CSS_INPUT_ELEMENT}`);
const newCloseButton = newSection.querySelector(".popup__close");
const newSubmitButton = newSection.querySelector(".popup__button");
const newNameInput = newSection.querySelector(".popup__input_type_card-name");
const newLinkInput = newSection.querySelector(".popup__input_type_url");

// Selección de elementos DOM del popup ver imágen ampliada
const imageSection = document.querySelector("#image-popup");
const imageCloseButton = imageSection.querySelector(".popup__close");
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
 * Funciones generales: abrir/cerrar popups (ventans modales)
 *************************************************************************/

function toggleButtonState(inputs, button) {
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !allValid;
}

function resetModal(form) {
  /*
  Se inicializa el estado de la forma en preparación para abrirse
  */

  // Se limpian inputs y mensajes de validación cotenidos en la forma
  const formInputs = form.querySelectorAll(`.${CSS_INPUT_ELEMENT}`);
  formInputs.forEach((input) => {
    input.value = "";
    hideInputError(input);
  });

  // Se desativa el boton submit
  const submitButton = form.querySelector(`.${CSS_SUBMIT_BUTTON}`);
  toggleButtonState(formInputs, submitButton);
  // Talvez sólo era necesario ejecutar submitButton.disabled directamente
}

function handleModalKeys(evt) {
  /*
 Paso 4. Cerrar la ventana emergente pulsando Esc
 */
  if (evt.key === "Escape") {
    // Recuperamos el popup (forma) abierta (la visible con la clase "popup_is-opened")
    const openedForm = document.querySelector(`.${CSS_OPEN_POPUP}`);
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

function addModalListeners() {
  /*
  Cargar a todas las ventanas emergentes (popups) los
  listeners necesarios para su funcionamiento:

    * Clic del mouse para cerrar la venta en cualquier area.
  */
  popups.forEach((popup) => {
    // Cerrar con clic con overlay
    popup.addEventListener("click", handleModalClick);
  });
}

function openModal(form) {
  console.log("openModal().Abriendo modal.");

  // Se agrega listener para cerrar el popup con la tecla Esc
  document.addEventListener("keydown", handleModalKeys);

  // Se inicializa/prepara el popup para mostrarse
  resetModal(form);

  // Se muestra el popup
  form.classList.add(CSS_OPEN_POPUP);
}

function closeModal(form) {
  console.log("closeModal(). Cerrando modal.");

  // Se cierra (oculta) el popup
  form.classList.remove(CSS_OPEN_POPUP);

  // Se elimina listener para cerrar el popup con la tecla Esc
  document.removeEventListener("keydown", handleModalKeys);
}

/**************************************************************************
 * Funciones generales: validación de datos de entrada
 *  - Verificar si un input o formulario es válido
 *  - Mostrar/ocultar mensajes de error a los inputs
 *************************************************************************/

function getInputTypeErrID(inputElement) {
  // Con el atributo "name" del input, se crea
  // el nombre de clase asignada a su correspondiente
  // elemento SPAN de mensaje de error
  return `.${inputElement.name}${CSS_INPUT_NAME_ERR_SUFIX}`;
}

function showInputError(inputElement, errorMessage) {
  const spanInputErrorID = getInputTypeErrID(inputElement);
  const errorSpan = document.querySelector(spanInputErrorID);
  inputElement.classList.add(CSS_HIGHLIGHT_INVALID_INPUT);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(CSS_SHOW_VALIDATION_MSG);
}

function hideInputError(inputElement) {
  const spanInputErrorID = getInputTypeErrID(inputElement);
  const errorSpan = document.querySelector(spanInputErrorID);
  inputElement.classList.remove(CSS_HIGHLIGHT_INVALID_INPUT);
  errorSpan.textContent = "";
  errorSpan.classList.remove(CSS_SHOW_VALIDATION_MSG);
}

function addPopupValidationListeners(inputElements, submitButton) {
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
}

function handleOpenEditModal() {
  console.log("handleOpenEditModal(). Abriendo edit-popup.");
  fillProfileForm();
  openModal(editSection);
}

editCloseButton.addEventListener("click", function () {
  console.log("Cerrando el popup de edición de perfil.");
  closeModal(editSection);
});

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
  //cardContainer.append(newCard);
  cardContainer.prepend(newCard);
}

/**************************************************************************
 * Funciones para la creación de tarjetas a través del popup de creación de tarjeta
 *************************************************************************/

newCloseButton.addEventListener("click", function () {
  console.log("Cerrando el popup de creación de tarjeta.");
  closeModal(newSection);
});

newForm.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  console.log("handleCardFormSubmit(). Guardando nueva tarjeta.");
  evt.preventDefault();
  closeModal(newSection);
  const name = newNameInput.value;
  const link = newLinkInput.value;
  newForm.reset();
  renderCard(name, link, cardsContainer);
}

/**************************************************************************
 * Funciones para vista de una tarjeta específica en el popup de imagen ampliada
 *************************************************************************/

imageCloseButton.addEventListener("click", function () {
  console.log("Cerrando el popup de consulta de tarjeta.");
  closeModal(imageSection);
});

/**************************************************************************
 * Código para la inicialización de la página
 *************************************************************************/

// Crear dinámicamente las tarjetas a mostrar a partir de los datos
// en el array initialCards
initialCards.forEach(function (card) {
  console.log("Card name: " + card.name + ", Card link: " + card.link);
  renderCard(card.name, card.link, cardsContainer);
});

// edit-profile-form: Inicializar (cargar) eventos de valización a los campos de captura
console.log("edit-profile-form: Cargar listeners a inputs");

addPopupValidationListeners(editFormInputs, editSubmitButton);
addPopupValidationListeners(newFormInputs, newSubmitButton);
addModalListeners();
