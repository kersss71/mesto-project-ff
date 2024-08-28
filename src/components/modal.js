// Функции открытия/закрытия попапов

export function openPopup (popupEl) {
    popupEl.classList.add('popup_is-opened')
    document.addEventListener('keydown', closePopupEsc)
    popupEl.addEventListener('click', closePopupOverlay)
}

export function closePopup (popupEl) {
    popupEl.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closePopupEsc)
    popupEl.removeEventListener('click', closePopupOverlay)

}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup.popup_is-opened')
        closePopup(popupOpen)
    }
  }

function closePopupOverlay (evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target)
  }}
