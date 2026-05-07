console.log("Script index.js conectado.");
import { Card } from "./card.js";
import { FormValidator } from "./formvalidator.js";
import {
  openModal,
  closeModal,
  handleModalClick,
  CSS_POPUP_DIV,
  CSS_POPUP_FORM,
  CSS_CLOSE_BUTTON,
  CSS_SUBMIT_BUTTON,
  CSS_INPUT_ELEMENT,
  CSS_CARD_CONTAINER,
  CSS_CARD_TEMPLATE,
  CSS_EDIT_DIV,
  CSS_EDIT_NAME,
  CSS_EDIT_DESCRIPTION,
  CSS_NEW_DIV,
  CSS_NEW_NAME,
  CSS_NEW_LINK,
} from "./utils.js";

// Selección de elementos DOM para la gestión de la plantilla de tarjeta
const cardsContainer = document.querySelector(CSS_CARD_CONTAINER);

// Selección de elementos DOM relacionados con la visualización del perfil
const profileSection = document.querySelector(".profile");
const profileAddButton = profileSection.querySelector(".profile__add-button");
const profileEditButton = profileSection.querySelector(".profile__edit-button");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description",
);

// Selección de elementos DOM del popup edición de perfil
const editSection = document.querySelector(CSS_EDIT_DIV);
const editForm = editSection.querySelector(CSS_POPUP_FORM);
const editNameInput = editForm.querySelector(CSS_EDIT_NAME);
const editDescriptionInput = editForm.querySelector(CSS_EDIT_DESCRIPTION);

// Selección de elementos DOM del popup nueva de tarjeta
const newSection = document.querySelector(CSS_NEW_DIV);
const newForm = newSection.querySelector(CSS_POPUP_FORM);
const newNameInput = newSection.querySelector(CSS_NEW_NAME);
const newLinkInput = newSection.querySelector(CSS_NEW_LINK);

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

function loadCards(initialCards) {
  // Crea dinámicamente las tarjetas a mostrar a partir
  // de los datos en el array initialCards
  initialCards.forEach(function (cardData) {
    console.log(
      "loadCards() -> Card name: " +
        cardData.name +
        ", Card link: " +
        cardData.link,
    );
    renderCard(cardData, cardsContainer);
    // const newCard = new Card(cardData, CSS_CARD_TEMPLATE);
    // cardsContainer.prepend(newCard.getCardElement());
  });
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

  const popupSelectors = {
    css_input_element: CSS_INPUT_ELEMENT,
    css_submit_button: CSS_SUBMIT_BUTTON,
  };

  const popups = document.querySelectorAll(CSS_POPUP_DIV);
  popups.forEach((popup) => {
    console.log(`  Configurando popup ${popup.id}`);

    // Cerrar con clic con overlay
    console.log(`  Agregando listener cerrar con clic: handleModalClick()`);
    popup.addEventListener("click", handleModalClick);

    // Cerrar con botón X
    console.log(`  Agregando listener cerrar con boton: callback anónimo`);
    const closeButton = popup.querySelector(CSS_CLOSE_BUTTON);
    closeButton.addEventListener("click", function () {
      console.log("Cerrando popup.");
      closeModal(popup);
    });

    // Validación de los campos del formulario
    const inputs = popup.querySelectorAll(CSS_INPUT_ELEMENT);
    if (inputs.length > 0) {
      console.log(`  Agregando listener validar captura de datos`);
      const formValidator = new FormValidator(popupSelectors, popup);
      formValidator.setEventListeners();
    } else {
      console.log(`  Popup de consulta (sin captura de datos)`);
    }
  });

  console.log("initModals(). Termina.");
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
 * Funciones para la creación de tarjetas a través del popup de creación de tarjeta
 *************************************************************************/

function renderCard(cardData, cardContainer) {
  console.log(
    "renderCard() - > Card name: " +
      cardData.name +
      ", Card link: " +
      cardData.link,
  );
  const newCard = new Card(cardData, CSS_CARD_TEMPLATE);
  cardContainer.prepend(newCard.getCardElement());
}

function handleCardFormSubmit(evt) {
  console.log("handleCardFormSubmit(). Guardando nueva tarjeta.");
  evt.preventDefault();

  // Crear nueva tarjeta
  const name = newNameInput.value;
  const link = newLinkInput.value;
  renderCard({ name, link }, cardsContainer);

  // Limpiar inputs del formulario
  //newForm.reset();
  closeModal(newSection);
}

newForm.addEventListener("submit", handleCardFormSubmit);

// Crear y mostrar las tarjetas iniciales
loadCards(initialCards);

// Inicializar las ventanas modales
initModals();
