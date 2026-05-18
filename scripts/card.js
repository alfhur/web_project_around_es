import PopupWithImage from "./popupwithimage.js";
import {
  //  openModal,
  CSS_CARD,
  CSS_TITLE,
  CSS_IMAGE,
  CSS_LIKE_BUTTON,
  CSS_DELETE_BUTTON,
  CSS_DISPLAY_LIKE,
  CSS_IMAGE_DIV,
  //  CSS_IMAGE_CAPTION,
  //  CSS_IMAGE_IMAGE,
} from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._cardElement = this._getTemplate(templateSelector);
  }

  getCardElement() {
    console.log("Card.getCardElement(). Tarjeta: " + this._data.name);

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
    console.log("Card._setEventListeners()");
    const cardElement = this._cardElement;
    const cardImage = cardElement.querySelector(CSS_IMAGE);
    const cardLikeButton = cardElement.querySelector(CSS_LIKE_BUTTON);
    const cardDeleteButton = cardElement.querySelector(CSS_DELETE_BUTTON);

    cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    cardLikeButton.addEventListener("click", (event) => {
      this._handleLikeButtonClick(event);
    });

    cardDeleteButton.addEventListener("click", (event) => {
      this._handleDeleteButtonClick(event);
    });
  }

  _handleImageClick() {
    console.log("Card._handleImageClick(). Click botón 'Ver tarjeta'");
    const openImage = new PopupWithImage(CSS_IMAGE_DIV);
    openImage.open(this._data.name, this._data.link);
  }

  _handleLikeButtonClick() {
    console.log("Card._handleLikeButtonClick(). Click botón 'Me gusta'");
    const cardElement = this._cardElement;
    const cardLikeButton = cardElement.querySelector(CSS_LIKE_BUTTON);
    cardLikeButton.classList.toggle(CSS_DISPLAY_LIKE);
  }

  _handleDeleteButtonClick() {
    console.log("Card._handleDeleteButtonClick(). Click botón 'Eliminar'");
    const cardElement = this._cardElement;
    cardElement.remove();
  }
}
