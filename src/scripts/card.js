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
  constructor(
    data,
    templateSelector,
    openImagePopupCallback,
    deleteButtonCallBack,
    likeButtonCallback,
  ) {
    this.id = data._id;
    this.name = data.name;
    this.link = data.link;
    this.isLiked = data.isLiked;
    this._cardElement = this._getTemplate(templateSelector);
    this._handleCardClick = openImagePopupCallback;
    this._handleLikeButtonClick = likeButtonCallback;
    this._handleDeleteButtonClick = deleteButtonCallBack;
  }

  like() {
    console.log("Card.like().");
    const cardElement = this._cardElement;
    const cardLikeButton = cardElement.querySelector(CSS_LIKE_BUTTON);
    cardLikeButton.classList.toggle(CSS_DISPLAY_LIKE);
  }

  getCardElement() {
    console.log("Card.getCardElement(). Tarjeta: " + this.name);

    const cardElement = this._cardElement;
    const cardImage = cardElement.querySelector(CSS_IMAGE);
    const cardTitle = cardElement.querySelector(CSS_TITLE);

    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardTitle.textContent = this.name;
    if (this.isLiked) {
      this.like();
    }

    this._setEventListeners();

    return cardElement;
  }

  delete() {
    console.log(`Card.delete(). Eliminar tarjeta ${this.name}`);
    const cardElement = this._cardElement;
    cardElement.remove();
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

    cardLikeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(this);
    });

    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this);
    });
  }
}
