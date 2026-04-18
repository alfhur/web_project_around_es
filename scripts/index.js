console.log("Script index.js conectado.");

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
const editCloseButton = editSection.querySelector(".popup__close");
//const editSubmitButton = editForm.querySelector(".popup__submit-button");
const editNameInput = editForm.querySelector(".popup__input_type_name");
const editDescriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);

// Selección de elementos DOM del popup nueva de tarjeta
const newSection = document.querySelector("#new-card-popup");
const newForm = newSection.querySelector(".popup__form");
const newCloseButton = newSection.querySelector(".popup__close");
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

function openModal(form) {
  console.log("openModal().Abriendo modal.");
  form.classList.add("popup_is-opened");
}

function closeModal(form) {
  console.log("closeModal(). Cerrando modal.");
  form.classList.remove("popup_is-opened");
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

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder-image.jpg",
) {
  console.log(
    "getCardElement(). Creando tarjeta con nombre: " +
      name +
      " y link: " +
      link,
  );

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

initialCards.forEach(function (card) {
  console.log("Card name: " + card.name + ", Card link: " + card.link);
  renderCard(card.name, card.link, cardsContainer);
});

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
