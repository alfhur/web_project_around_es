import {
  CSS_DISPLAY_POPUP,
  CSS_CLOSE_BUTTON,
  CSS_POPUP_FORM,
} from "./utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // Abre el popup
    this._popup.classList.add(CSS_DISPLAY_POPUP);
  }

  close() {
    // Cierra el popup
    this._popup.classList.remove(CSS_DISPLAY_POPUP);
  }

  setEventListeners() {
    // Agrega detectores de eventos para cerrar el popup cuando:
    //  * Se da clic el icono cerrar
    //  * Se da clic el área sombreada del popup
    //  * Se presiona la tecla ESC
    const closeButton = this._popup.querySelector(CSS_CLOSE_BUTTON);

    // Cerrar popup con el boton X-Cerrar
    closeButton.addEventListener("click", () => {
      this._handleButtonClose();
    });

    // Cerrar popup con click fuera de la ventana popup
    this._popup.addEventListener("click", () => {
      this._handlePopupClose(event);
    });

    // Cerrar popup con tecla ESC
    const form = this._popup.querySelector(CSS_POPUP_FORM);
    // form.addEventListener("keydown", (evt) => {
    //   console.log(
    //     `Popup.setEventListeners(). Ejecutando listener tecla KeyDown`,
    //   );
    //   this._handleEscClose(evt);
    // });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleButtonClose() {
    // Cierre el popup cuando se de click en el botón "X" cerrar
    this.close();
  }

  _handlePopupClose(evt) {
    // Cierra el popup cuando se da clic en el area sombreada del popup
    //  evt.currentTarget -> el popup completo (.popup)
    //  evt.target -> el elemento exacto donde se hace clic
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    // Cierra el popup al pulsar la tecla ESC
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
