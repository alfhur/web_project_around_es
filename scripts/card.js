import PopupWithImage from "./popupwithimage.js";
import {
  CSS_CARD,
  CSS_TITLE,
  CSS_IMAGE,
  CSS_LIKE_BUTTON,
  CSS_DELETE_BUTTON,
  CSS_DISPLAY_LIKE,
} from "./utils.js";

export default class Card {
  constructor(templateSelector, data, cardClickCallback) {
    this._data = data;
    this._cardElement = this._getTemplate(templateSelector);
    this._handleCardClick = cardClickCallback;
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
      this._handleCardClick(this);
    });

    cardLikeButton.addEventListener("click", (event) => {
      this._handleLikeButtonClick(event);
    });

    cardDeleteButton.addEventListener("click", (event) => {
      this._handleDeleteButtonClick(event);
    });
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
