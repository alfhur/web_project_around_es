console.log("Script index.js conectado.");

// Selección de elementos DOM para la gestión de la plantilla de tarjeta
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Selección de elementos DOM de la visualización de perfil
const profileSection = document.querySelector(".profile");
const profileEditButton = profileSection.querySelector(".profile__edit-button");
const profileAddButton = profileSection.querySelector(".profile__add-button");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description",
);

// Selección de elementos DOM del popup de edición de perfil
const editSection = document.querySelector("#edit-popup");
const editCloseButton = editSection.querySelector(".popup__close");
const editForm = editSection.querySelector(".popup__form");
const editSubmitButton = editForm.querySelector(".popup__submit-button");
const editNameInput = editForm.querySelector(".popup__input_type_name");
const editDescriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);

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
  console.log("Abriendo modal.");
  form.classList.add("popup_is-opened");
}

function closeModal(form) {
  console.log("Cerrando modal.");
  form.classList.remove("popup_is-opened");
}

/**************************************************************************
 * Funciones y eventos para la sección profile
 *************************************************************************/

profileEditButton.addEventListener("click", function () {
  console.log("Abriendo popup de edición de perfil.");
  handleOpenEditModal();
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
 * Funciones y eventos para la creación de tarjetas y la forma new-card-popup
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

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

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
  cardContainer.append(newCard);
}

initialCards.forEach(function (card) {
  console.log("Card name: " + card.name + ", Card link: " + card.link);
  renderCard(card.name, card.link, cardsContainer);
});
