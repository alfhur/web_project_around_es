console.log("Script index.js conectado.");

import Section from "./section.js";
import UserInfo from "./userinfo.js";
import Card from "./card.js";
import PopupWithImage from "./popupwithimage.js";
import PopupWithForm from "./popupwithform.js";
import {
  CSS_PROFILE_TITLE,
  CSS_PROFILE_DESCRIPTION,
  CSS_CARD_CONTAINER,
  CSS_CARD_TEMPLATE,
  CSS_EDIT_DIV,
  CSS_EDIT_NAME,
  CSS_EDIT_DESCRIPTION,
  CSS_IMAGE_DIV,
  CSS_NEW_DIV,
} from "./utils.js";

// Selección de elementos DOM relacionados con la visualización del perfil
const profileSection = document.querySelector(".profile");
const profileAddButton = profileSection.querySelector(".profile__add-button");
const profileEditButton = profileSection.querySelector(".profile__edit-button");

// Selección de elementos DOM del popup edición de perfil
const editSection = document.querySelector(CSS_EDIT_DIV);
const editNameInput = editSection.querySelector(CSS_EDIT_NAME);
const editDescriptionInput = editSection.querySelector(CSS_EDIT_DESCRIPTION);

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

const userProfile = new UserInfo(CSS_PROFILE_TITLE, CSS_PROFILE_DESCRIPTION);

/**************************************************************************
 * Declaraciones para el popup Ver imagen
 *************************************************************************/

const openImageModal = new PopupWithImage(CSS_IMAGE_DIV);

/**************************************************************************
 * Declaraciones para el popup Nueva tarjeta
 *************************************************************************/

const renderNewCardCallback = (cardData) => {
  const newCard = new Card(CSS_CARD_TEMPLATE, cardData, () => {
    openImageModal.open(cardData);
  });
  const newCardElement = newCard.getCardElement();
  cardSection.addItem(newCardElement);
};

const newCardModal = new PopupWithForm(CSS_NEW_DIV, renderNewCardCallback);

/**************************************************************************
 * Declaraciones para la sección tarjetas y su visualización
 *************************************************************************/

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderNewCardCallback,
  },
  CSS_CARD_CONTAINER,
);

/**************************************************************************
 * Declaraciones para la sección Profile
 *************************************************************************/

const editProfileSubmitCallback = (profileData) => {
  userProfile.setUserInfo(profileData);
};
const editProfileModal = new PopupWithForm(
  CSS_EDIT_DIV,
  editProfileSubmitCallback,
);

/**************************************************************************
 * Declaraciones para editar el profile
 *************************************************************************/

profileEditButton.addEventListener("click", function () {
  console.log("Abriendo popup de edición de perfil.");
  fillProfileForm();
  editProfileModal.open();
});

profileAddButton.addEventListener("click", function () {
  console.log("Abriendo popup de creación de tarjeta.");
  newCardModal.open();
});

/**************************************************************************
 * Funciones y eventos para el popup de edición de perfil
 *************************************************************************/

function fillProfileForm() {
  console.log("fillProfileForm(). Cargando datos a edit-popup.");
  const data = userProfile.getUserInfo();
  editNameInput.value = data.name;
  editDescriptionInput.value = data.description;
}

/**************************************************************************
 * Inicialización de la página
 *************************************************************************/

// Renderizar (mostrar) información de las tarjetas en el array initialCards
cardSection.renderer();

// Inicializar ventanas modales
editProfileModal.setEventListeners();
newCardModal.setEventListeners();
openImageModal.setEventListeners();
