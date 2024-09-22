import "../pages/index.css"; 
import { createCard, deleteCard, likeCard, newCardForm } from "../src/components/card"
import { openPopup, closePopup, } from "../src/components/modal"
import { clearValidation, enableValidation} from "../src/components/validation"
import * as api from "../src/components/api"
// @todo: DOM узлы
const cardPlace = document.querySelector('.places__list')
const editPopup = document.querySelector('.popup_type_edit')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
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
const profileConfig = {}
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarEditButton = avatarPopup.querySelector('.popup__button')
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

// promises all

Promise.all([api.getProfileInfo(), api.getInitialCards()])
.then(([resProfile, resCards]) => {
    renderProfile(resProfile)
    renderInitialCards(resCards)
})

// rendered profile / renderred cards functions

function renderProfile (profileInfo) {
    profileConfig.id = profileInfo._id
	profileConfig.title = profileInfo.name
	profileConfig.about = profileInfo.about
	profileConfig.avatar = profileInfo.avatar
    profileTitle.textContent = profileConfig.title
	profileDescription.textContent = profileConfig.about
	profileImage.setAttribute('style', `background-image: url(${profileConfig.avatar})`)
}

function renderInitialCards (cardData) {
    Array.from(cardData).forEach((el) => {
        const card = createCard(el, deleteCardMain, likeCardMain, openPopupWithImage, profileConfig.id)
        cardPlace.append(card)
    })
}

// Изменение профиля

function handleProfileFormSubmit(evt) {
    const jobInputValue = jobInput.value
    const nameInputValue = nameInput.value
    const button = document.querySelector('.popup__button')
    button.textContent = 'Сохранение...'
    evt.preventDefault()
    api.updateProfileInfo(nameInputValue, jobInputValue)
    .then((res) => {
        profileTitle.textContent = res.name
        profileDescription.textContent = res.about  
        closePopup(editPopup)
    })
    .catch((err) => console.log(err))
    .finally(() => button.textContent = 'Сохранить')
}

// Анимированные попапы

popups.forEach(el => {
    el.classList.add('popup_is-animated')
})

// открытие попапа с изображение

export function openPopupWithImage(imageSrc, captionText) {
    popupImage.src = imageSrc
    popupImage.alt = captionText
    popupCaption.textContent = captionText
    openPopup(popupTypeImage)
}

// Функция добавления новой карточки из формы попапа

function handleNewCard(evt) {
    const cardNameValue = cardName.value
    const cardLinkValue = cardLink.value
    const button = newCardForm.button;
    const newCard = {
        name: cardNameValue,
        link: cardLinkValue,
    }
    button.textContent = 'Сохранение...'
    evt.preventDefault()
    api.newCardRequest(newCard)
    .then((res) => {
        const card = createCard(res, deleteCardMain, likeCardMain, openPopupWithImage, profileConfig.id)
        cardPlace.prepend(card);
        closePopup(newCardPopup)
        newCardForm.reset()
        clearValidation(document.forms.avatar, validationConfig)
    })
    .catch((err) => console.log(err))
    .finally(() => button.textContent = 'Сохранить')  
}

// Функция удаления карточки na servere

export function deleteCardMain (evt, cardData) {
    api.deleteCardRequest(cardData._id)
    .then(()=> {
        deleteCard(evt)
    })
    .catch((err) => console.log(err))
}

export function likeCardMain(evt, cardData, userId, likeCounter) {
    const likePromise = cardData.likes.some(like => like._id === userId) ? api.deleteLikeRequest(cardData._id) : api.addLikeRequest(cardData._id)
	likePromise
    .then((res) => { 
        cardData.likes = res.likes 
        likeCounter.textContent = res.likes.length;
        likeCard(evt) 
})
    .catch((err) => console.log(err))
}

function updateAvatar (evt) {
    evt.preventDefault()
    const link = document.forms.avatar.name.value
    const button = document.forms.avatar.button
    button.textContent = 'Сохранение...'
    api.updateAvatarRequest(link)
    .then((res) => {
        profileImage.setAttribute('style', `background-image: url(${res.avatar})`)
        closePopup(avatarPopup)
        document.forms.avatar.reset()
        clearValidation(document.forms.avatar, validationConfig)
    })
    .catch((err) => console.log(err))
    .finally(() => button.textContent = 'Сохранить')  
}


// addeventlisteners

editButton.addEventListener('click', () => {
    profileForm.name.value = profileTitle.textContent
    profileForm.description.value = profileDescription.textContent
    clearValidation(profileForm, validationConfig)
    openPopup(editPopup)
})

newCardButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig)
    newCardForm.reset()
    openPopup(newCardPopup)
})

profileForm.addEventListener('submit', handleProfileFormSubmit)

newCardForm.addEventListener('submit', handleNewCard)

profileImage.addEventListener('click', () => openPopup(avatarPopup))
avatarEditButton.addEventListener('click', (evt) => updateAvatar(evt))


// Обработчики закрытия попапов

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'))
    })
})


enableValidation(validationConfig)



