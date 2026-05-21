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
    console.log("");
    console.log(`Popup.open(). Abriendo modal: ${this._selector}`);
    this._popup.classList.add(CSS_DISPLAY_POPUP);
  }

  close() {
    // Cierra el popup
    console.log(`Popup.close(). Cerrando modal: ${this._selector}`);
    console.log("");
    this._popup.classList.remove(CSS_DISPLAY_POPUP);
  }

  setEventListeners() {
    // Agrega detectores de eventos para cerrar el popup cuando:
    //  * Se da clic el icono cerrar
    //  * Se da clic el área sombreada del popup
    //  * Se presiona la tecla ESC
    console.log(`Popup.setEventListeners(). Modal: ${this._selector}`);
    const closeButton = this._popup.querySelector(CSS_CLOSE_BUTTON);

    // Cerrar popup con el boton X-Cerrar
    closeButton.addEventListener("click", () => {
      console.log(
        `Popup.setEventListeners(). Ejecutando listener botón cerrar`,
      );
      this._handleButtonClose();
    });

    // Cerrar popup con click fuera de la ventana popup
    this._popup.addEventListener("click", () => {
      console.log(
        `Popup.setEventListeners(). Ejecutando listener click por fuera del popup`,
      );
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
      console.log(
        `Popup.setEventListeners(). Ejecutando listener tecla KeyDown`,
      );
      this._handleEscClose(evt);
    });
  }

  _handleButtonClose() {
    // Cierre el popup cuando se de click en el botón "X" cerrar
    console.log(`   Popup._handleButtonClose(). Modal: ${this._selector}`);
    this.close();
  }

  _handlePopupClose(evt) {
    // Cierra el popup cuando se da clic en el area sombreada del popup
    //  evt.currentTarget -> el popup completo (.popup)
    //  evt.target -> el elemento exacto donde se hace clic
    console.log(`   Popup._handlePopupClose(). Modal: ${this._selector}`);
    if (evt.currentTarget === evt.target) {
      console.log(`      Popup._handlePopupClose(). Target: ${this._selector}`);
      this.close();
    }
  }

  _handleEscClose(evt) {
    // Cierra el popup al pulsar la tecla ESC
    if (evt.key === "Escape") {
      console.log(`   Popup._handleEscClose(). Modal: ${this._selector}`);
      this.close();
    }
  }
}
