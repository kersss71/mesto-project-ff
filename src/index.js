import "../pages/index.css"; 
import { initialCards } from "./cards"
import { createCard, deleteCard, likeCard, formElementCard } from "../src/components/card"
import { openPopup, closePopup, } from "../src/components/modal"

// @todo: DOM узлы

export const cardPlace = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const newCardPopup = document.querySelector('.popup_type_new-card')
const profileForm = document.forms.editprofile
const nameInput = profileForm.name
const jobInput = profileForm.description
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    const itemCard = createCard(item, deleteCard, likeCard, openPopupWithImage);
    cardPlace.append(itemCard);    
})

// Обработчики открытия попапов

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    profileForm.name.value = profileTitle.textContent;
    profileForm.description.value = profileDescription.textContent;
    openPopup(editPopup)
})

document.querySelector('.profile__add-button').addEventListener('click', () => {
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

profileForm.addEventListener('submit', handleFormSubmit); 

// Добавление новой карточки через попап

formElementCard.addEventListener('submit', handleNewCard)

// Анимированные попапы

document.querySelectorAll('.popup').forEach(el => {
    el.classList.add('popup_is-animated')
})

// открытие попапа с изображение

function openPopupWithImage(imageSrc, captionText) {
    popupImage.src = imageSrc;
    popupImage.alt = captionText;
    popupCaption.textContent = captionText;

    openPopup(popupTypeImage);
}

// Функция добавления новой карточки из формы попапа

function handleNewCard(evt) {
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
    closePopup(document.querySelector('.popup_type_new-card'))
    formElementCard.reset()
}