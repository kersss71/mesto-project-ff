import "../pages/index.css"; 
import { initialCards } from "./cards"
import { createCard, deleteCard, likeCard, handleNewCard, formElementCard } from "../src/components/card"
import { openPopup, closePopup, openPopupWithImage } from "../src/components/modal"

// @todo: Темплейт карточки

export const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узлы

export const cardPlace = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    const itemCard = createCard(item, deleteCard, likeCard, openPopupWithImage);
    cardPlace.append(itemCard);    
})

// Обработчики открытия попапов

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const editPopup = document.querySelector('.popup_type_edit')
    const profileTitle = document.querySelector('.profile__title')
    const profileDescription = document.querySelector('.profile__description')
    const formEdit = document.forms.editprofile
    formEdit.name.value = profileTitle.textContent;
    formEdit.description.value = profileDescription.textContent;
    openPopup(editPopup)
})

document.querySelector('.profile__add-button').addEventListener('click', () => {
    const newCardPopup = document.querySelector('.popup_type_new-card')
    openPopup(newCardPopup)
})


// Обработчики закрытия попапов

const closeButtons = document.querySelectorAll('.popup__close')
closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'))
    })
})

// Изменение профиля

// Обработчик «отправки» формы
const formElement = document.forms.editprofile
const nameInput = formElement.name
const jobInput = formElement.description
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    
    // Получение значение полей jobInput и nameInput из свойства value
    const jobInputValue = jobInput.value
    const nameInputValue = nameInput.value
    // Выберите элементы, куда должны быть вставлены значения полей
    document.querySelector('.profile__title').textContent = nameInputValue
    document.querySelector('.profile__description').textContent = jobInputValue
    closePopup(document.querySelector('.popup_type_edit'))
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', handleFormSubmit); 

// Добавление новой карточки через попап

formElementCard.addEventListener('submit', handleNewCard)

// Анимированные попапы

document.querySelectorAll('.popup').forEach(el => {
    el.classList.add('popup_is-animated')
})

// открытие попапа с изображение

