import {
  openModal,
  CSS_CARD,
  CSS_TITLE,
  CSS_IMAGE,
  CSS_LIKE_BUTTON,
  CSS_DELETE_BUTTON,
  CSS_DISPLAY_LIKE,
  CSS_IMAGE_DIV,
  CSS_IMAGE_CAPTION,
  CSS_IMAGE_IMAGE,
} from "./utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._cardElement = this._getTemplate(templateSelector);
  }

  getCardElement() {
    console.log("getCardElement(). Creando tarjeta: " + this._data.name);

    const cardElement = this._cardElement;
    const cardImage = cardElement.querySelector(CSS_IMAGE);
    const cardTitle = cardElement.querySelector(CSS_TITLE);

    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    cardTitle.textContent = name;

    this._setEventListeners();

    return cardElement;
  }

  _getTemplate(css_card_template) {
    return document
      .querySelector(css_card_template)
      .content.querySelector(CSS_CARD)
      .cloneNode(true);
  }

  _setEventListeners() {
    const cardElement = this._cardElement;
    const cardImage = cardElement.querySelector(CSS_IMAGE);
    const cardLikeButton = cardElement.querySelector(CSS_LIKE_BUTTON);
    const cardDeleteButton = cardElement.querySelector(CSS_DELETE_BUTTON);

    cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    cardLikeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
  }

  _handleImageClick() {
    console.log("Click botón 'Ver tarjeta'");
    // Selección de elementos DOM del popup ver imágen ampliada
    const imageSection = document.querySelector(CSS_IMAGE_DIV);
    const imageName = imageSection.querySelector(CSS_IMAGE_CAPTION);
    const imageElement = imageSection.querySelector(CSS_IMAGE_IMAGE);

    imageName.textContent = name;
    imageElement.src = this._data.link;
    imageElement.alt = this._data.name;

    openModal(imageSection);
  }

  _handleLikeButtonClick() {
    console.log("Click botón 'Me gusta'");
    const cardElement = this._cardElement;
    const cardLikeButton = cardElement.querySelector(CSS_LIKE_BUTTON);
    cardLikeButton.classList.toggle(CSS_DISPLAY_LIKE);
  }

  _handleDeleteButtonClick() {
    console.log("Click botón 'Eliminar'");
    const cardElement = this._cardElement;
    cardElement.remove();
  }
}
