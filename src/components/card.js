import { templateCard, cardPlace} from "../index";
import { openPopupWithImage, closePopup, openPopup} from "../components/modal"
import { initialCards } from "../cards";

// @todo: Функция создания карточки

export function createCard (item, deleteCard, likeCard, openPopupWithImage) {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button')
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    cardElement.querySelector('.card__image').addEventListener('click', () => openPopupWithImage(item.link, item.name));

    deleteButton.addEventListener('click', deleteCard); 

    likeButton.addEventListener('click', likeCard)

    return cardElement;
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
    evt.stopPropagation()
    evt.target.closest('.places__item').remove();
}

// Функция лайка карточки

export function likeCard(evt) {
    if(evt.target.classList.contains('card__like-button')) {
        evt.stopPropagation()
        evt.target.classList.toggle('card__like-button_is-active')
    }
}

// функция создания новой карточки через попап пользователем

export const formElementCard = document.forms.newplace

export function handleNewCard(evt) {
    const cardName = formElementCard.placename
    const cardLink = formElementCard.link
    evt.preventDefault();
    const cardNameValue = cardName.value
    const cardLinkValue = cardLink.value
    const newCard = {
        name: cardNameValue,
        link: cardLinkValue,
    }
    const card = createCard(newCard, deleteCard, likeCard, openPopupWithImage)
    cardPlace.prepend(card);
    initialCards.push(newCard)
    console.log(initialCards)
    closePopup(document.querySelector('.popup_type_new-card'))
    formElementCard.reset()
}