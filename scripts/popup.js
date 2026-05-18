import { CSS_DISPLAY_POPUP, CSS_CLOSE_BUTTON } from "./utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // Abre el popup
    console.log(`Popup.open(). Abriendo modal: ${this._selector}`);
    this.setEventListeners();
    this._popup.classList.add(CSS_DISPLAY_POPUP);
  }

  close() {
    // Cierra el popup
    console.log(`Popup.close(). Cerrando modal: ${this._selector}`);
    this._popup.classList.remove(CSS_DISPLAY_POPUP);
    //    this._removeEventListeners();
  }

  setEventListeners() {
    // Agrega detectores de eventos para cerrar el popup cuando:
    //  * Se da clic el icono cerrar
    //  * Se da clic el área sombreada del popup
    //  * Se presiona la tecla ESC
    console.log(`Popup.setEventListeners(). Modal: ${this._selector}`);
    const closeButton = this._popup.querySelector(CSS_CLOSE_BUTTON);

    closeButton.addEventListener("click", () => {
      this._handleButtonClose();
    });
    this._popup.addEventListener("click", (event) => {
      this._handlePopupClose(event);
    });
    this._popup.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }

  // _removeEventListeners() {
  //   console.log(`Popup._removeEventListeners(). Modal: ${this._selector}`);
  //   const closeButton = this._popup.querySelector(CSS_CLOSE_BUTTON);
  //   closeButton.removeEventListener("click", this._handleButtonClose);
  //   this._popup.removeEventListener("click", this._handlePopupClose);
  //   this._popup.removeEventListener("keydown", this._handleEscClose);
  // }

  _handleButtonClose() {
    // Cierre el popup cuando se de click en el botón "X" cerrar
    console.log(`Popup._handleButtonClose(). Modal: ${this._selector}`);
    this.close();
  }

  _handlePopupClose(evt) {
    // Cierra el popup cuando se da clic en el area sombreada del popup
    //  evt.currentTarget -> el popup completo (.popup)
    //  evt.target -> el elemento exacto donde se hace clic

    console.log(`Popup._handlePopupClose(). Modal: ${this._selector}`);
    if (evt.currentTarget === evt.target) {
      console.log(`Popup._handlePopupClose(). Target: ${this._selector}`);
      //closeModal(evt.currentTarget);
      this.close();
    }
  }

  _handleEscClose(evt) {
    // Cierra el popup al pulsar la tecla ESC
    if (evt.key === "Escape") {
      console.log(`Popup._handleEscClose(). Modal: ${this._selector}`);
      // Recuperamos el popup (forma) abierto (la visible con la clase "popup_is-opened")
      // const openedForm = document.querySelector(`.${CSS_DISPLAY_POPUP}`);
      //if (openedForm) {
      //  closeModal(openedForm);
      //}
      this.close();
    }
  }
}
