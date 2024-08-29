
// Темплейт карт

const templateCard = document.querySelector('#card-template').content;

export const newCardForm = document.forms.newplace


// @todo: Функция создания карточки

export function createCard (item, deleteCard, likeCard, openPopupWithImage) {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button')
    const cardImage = cardElement.querySelector('.card__image')
    const cardTitle = cardElement.querySelector('.card__title')
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    cardImage.addEventListener('click', () => openPopupWithImage(item.link, item.name));
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


