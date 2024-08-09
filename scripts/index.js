// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (item, deleteCard) {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    deleteButton.addEventListener('click', deleteCard);
    
    cardPlace.append(cardElement);    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const itemCard = createCard(item, deleteCard);
})