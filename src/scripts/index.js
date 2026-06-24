console.log("Script index.js conectado.");

import Api from "./api.js";
import Section from "./section.js";
import UserInfo from "./userinfo.js";
import Card from "./card.js";
import PopupWithImage from "./popupwithimage.js";
import PopupWithForm from "./popupwithform.js";
import PopupWithConfirmation from "./popupwithconfirmation.js";
import {
  CSS_PROFILE_TITLE,
  CSS_PROFILE_DESCRIPTION,
  CSS_PROFILE_IMAGE,
  CSS_CARD_CONTAINER,
  CSS_CARD_TEMPLATE,
  CSS_AVATAR_POPUP,
  CSS_EDIT_POPUP,
  CSS_EDIT_NAME,
  CSS_EDIT_DESCRIPTION,
  CSS_IMAGE_POPUP,
  CSS_NEW_POPUP,
  CSS_CONFIRMATION_POPUP,
} from "./utils.js";

// Selección de elementos DOM relacionados con la visualización del perfil
const profileSection = document.querySelector(".profile");
const profileAddButton = profileSection.querySelector(".profile__add-button");
const profileEditButton = profileSection.querySelector(".profile__edit-button");
const profileEditAvatarButton = profileSection.querySelector(
  ".profile__avatar-container",
);

// Selección de elementos DOM del popup edición de perfil
const editSection = document.querySelector(CSS_EDIT_POPUP);
const editNameInput = editSection.querySelector(CSS_EDIT_NAME);
const editDescriptionInput = editSection.querySelector(CSS_EDIT_DESCRIPTION);
let cardSection;

/**************************************************************************
 * Declaraciones para interactuar con el backend server
 *************************************************************************/

const apiOptions = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "a0e5fdb6-36f5-425e-af4b-8c72dbebc73e",
    "content-type": "application/json",
  },
};
const api = new Api(apiOptions);

/**************************************************************************
 * Declaraciones para el renderizado de tarjetas
 *************************************************************************/

const renderNewCardCallback = (cardData) => {
  const newCard = new Card(
    cardData,
    CSS_CARD_TEMPLATE,
    openImagePopupCallback,
    openConfirmDeletePopupCallback,
    likeCardCallback,
  );
  const newCardElement = newCard.getCardElement();
  cardSection.addItem(newCardElement);
};

const renderCards = (initialCards) => {
  // Se inicializa cardSection con la información
  // de las tarjetas de carga inicial y con
  // la función para renderizarlas
  cardSection = new Section(
    {
      items: initialCards,
      renderer: renderNewCardCallback,
    },
    CSS_CARD_CONTAINER,
  );
  // Se renderizan (muestran) las tarjetas
  cardSection.renderer();
};

/**************************************************************************
 * Declaraciones para el popup Confirmar borrado de tarjeta (confirmation-popup)
 *************************************************************************/

const deleteCardSubmitCallback = (card) => {
  console.log(`Index.deleteCardSubmitCallback() Borrar tarjeta ${card.name}`);
  api
    .deleteCard(card.id)
    .then(() => {
      card.delete();
    })
    .catch((res) => {
      console.log(`ERROR: ${res.status}`);
    });
};

const confirmCardDeleteModal = new PopupWithConfirmation(
  CSS_CONFIRMATION_POPUP,
  deleteCardSubmitCallback,
);

/**************************************************************************
 * Declaraciones para el popup Ver tarjeta (image-popup)
 *************************************************************************/

const openImageModal = new PopupWithImage(CSS_IMAGE_POPUP);

const openImagePopupCallback = (card) => {
  console.log("Index.openImagePopupCallback() Click card 'Abrir'");
  openImageModal.open({ name: card.name, link: card.link });
};

const openConfirmDeletePopupCallback = (card) => {
  console.log("Index.openConfirmDeletePopupCallback(). Click botón 'Eliminar'");
  confirmCardDeleteModal.open(card);
};

const likeCardCallback = (card) => {
  console.log("Index.likeCardCallback(). Click botón 'Like'");
  api
    .likeCard(card.id, !card.isLiked)
    .then(() => card.like())
    .catch((res) => {
      console.log(`ERROR: ${res.status}`);
    });
};

/**************************************************************************
 * Declaraciones para el popup Nueva tarjeta (new-card-popup)
 *************************************************************************/

const newCardSubmitCallback = (submitedData) => {
  const apiData = { name: submitedData["place-name"], link: submitedData.link };
  api
    .newCard(apiData)
    .then((serverData) => {
      renderNewCardCallback(serverData);
    })
    .catch((res) => {
      console.log(`ERROR: ${res.status}`);
    });
};

const newCardModal = new PopupWithForm(CSS_NEW_POPUP, newCardSubmitCallback);

/**************************************************************************
 * Declaraciones para el popup editar perfil de usuario (edit-popup)
 *************************************************************************/

const editProfileSubmitCallback = (submitedData) => {
  const apiData = { name: submitedData.name, about: submitedData.description };
  api
    .updateProfile(apiData)
    .then((serverData) => userProfile.setUserInfo(serverData))
    .catch((res) => {
      console.log(`ERROR: ${res.status}`);
    });
};

const editProfileModal = new PopupWithForm(
  CSS_EDIT_POPUP,
  editProfileSubmitCallback,
);

/**************************************************************************
 * Declaraciones para el popup editar avatar
 *************************************************************************/

const editAvatarSubmitCallback = (submitedData) => {
  const apiData = { avatar: submitedData.link };
  api
    .updateAvatar(apiData)
    .then((serverData) => {
      userProfile.setUserInfo(serverData);
    })
    .catch((res) => {
      console.log(`ERROR: ${res.status}`);
    });
};

const editAvatarModal = new PopupWithForm(
  CSS_AVATAR_POPUP,
  editAvatarSubmitCallback,
);

/**************************************************************************
 * Declaraciones para editar el perfil de usuario
 *************************************************************************/

profileAddButton.addEventListener("click", function () {
  console.log("Abriendo popup de creación de tarjeta.");
  newCardModal.open();
});

profileEditButton.addEventListener("click", function () {
  console.log("Abriendo popup de edición de perfil.");
  fillProfileForm();
  editProfileModal.open();
});

profileEditAvatarButton.addEventListener("click", function () {
  console.log("Abriendo popup de edición de avatar.");
  editAvatarModal.open();
});

const fillProfileForm = () => {
  console.log("fillProfileForm(). Cargando datos a edit-popup.");
  const data = userProfile.getUserInfo();
  editNameInput.value = data.name;
  editDescriptionInput.value = data.about;
};

/**************************************************************************
 * Declaraciones para gestionar la información del perfil de usuario
 *************************************************************************/

const profileSelectors = {
  name: CSS_PROFILE_TITLE,
  about: CSS_PROFILE_DESCRIPTION,
  avatar: CSS_PROFILE_IMAGE,
};

const userProfile = new UserInfo(profileSelectors);

const renderUser = (data) => {
  // Renderizar la información del usuario
  userProfile.setUserInfo(data);
};

/**************************************************************************
 * Inicialización de la página
 *************************************************************************/

// Inicializar de ventanas modales
newCardModal.setEventListeners();
openImageModal.setEventListeners();
editProfileModal.setEventListeners();
editAvatarModal.setEventListeners();
confirmCardDeleteModal.setEventListeners();

// Cargar la infomación desde el servidor y renderizarla
api
  .getInicialCards()
  .then((data) => {
    // Recuperar la información del usuario obtenida
    // del servidor y actualizarla en la página.
    renderUser(data[0]);

    // Recuperar la información de las tarjetas
    // obtenida del servidor y renderizarlas en la página.
    renderCards(data[1]);
  })
  .catch((res) => {
    console.log(`ERROR: ${res.status}`);
  });
