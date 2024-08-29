import "../pages/index.css"; 
import { initialCards } from "./cards"
import { createCard, deleteCard, likeCard, newCardForm } from "../src/components/card"
import { openPopup, closePopup, } from "../src/components/modal"

// @todo: DOM узлы

const cardPlace = document.querySelector('.places__list')
const editPopup = document.querySelector('.popup_type_edit')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const newCardPopup = document.querySelector('.popup_type_new-card')
const profileForm = document.forms.editprofile
const nameInput = profileForm.name
const jobInput = profileForm.description
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')
const editButton = document.querySelector('.profile__edit-button')
const newCardButton = document.querySelector('.profile__add-button')
const closeButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')
const cardName = newCardForm.placename
const cardLink = newCardForm.link

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    const itemCard = createCard(item, deleteCard, likeCard, openPopupWithImage);
    cardPlace.append(itemCard);    
})

// Обработчики открытия попапов

editButton.addEventListener('click', () => {
    profileForm.name.value = profileTitle.textContent;
    profileForm.description.value = profileDescription.textContent;
    openPopup(editPopup)
})

newCardButton.addEventListener('click', () => {
    openPopup(newCardPopup)
})

// Обработчики закрытия попапов

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'))
    })
})

// Изменение профиля

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const jobInputValue = jobInput.value
    const nameInputValue = nameInput.value
    profileTitle.textContent = nameInputValue
    profileDescription.textContent = jobInputValue
    closePopup(editPopup)
}

profileForm.addEventListener('submit', handleProfileFormSubmit); 

// Добавление новой карточки через попап

newCardForm.addEventListener('submit', handleNewCard)

// Анимированные попапы

popups.forEach(el => {
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
    evt.preventDefault();
    const cardNameValue = cardName.value
    const cardLinkValue = cardLink.value
    const newCard = {
        name: cardNameValue,
        link: cardLinkValue,
    }
    const card = createCard(newCard, deleteCard, likeCard, openPopupWithImage)
    cardPlace.prepend(card);
    closePopup(newCardPopup)
    newCardForm.reset()
}