import { likeCardMain } from "../index";
// Темплейт карт
const templateCard = document.querySelector('#card-template').content;

export const newCardForm = document.forms.newplace

// @todo: Функция создания карточки

export function createCard (item, deleteCardMain, openPopupWithImage, userId) {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true)
    const deleteButton = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    const likeCounter = cardElement.querySelector('.card__like-counter')
    cardImage.src = item.link
    cardImage.alt = item.name
    cardTitle.textContent = item.name
    likeCounter.textContent = item.likes.length

    if (item.owner._id !== userId) {
        deleteButton.remove()
    }

    if (item.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active')
    }

    cardImage.addEventListener('click', () => openPopupWithImage(item.link, item.name))
    deleteButton.addEventListener('click', (evt) => deleteCardMain(evt, item))
    likeButton.addEventListener('click', (evt) => likeCardMain(evt, item, userId, likeCounter))
    return cardElement;
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
    evt.stopPropagation()
    evt.target.closest('.places__item').remove()
}

// Функция лайка карточки

export function likeCard(evt) {
    if(evt.target.classList.contains('card__like-button')) {
        evt.stopPropagation()
        evt.target.classList.toggle('card__like-button_is-active')
    }
}
