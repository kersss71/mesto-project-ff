const showInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(config.inputErrorClass)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(config.errorClass)
}

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = ''
} 


const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity('')
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, config)
    } else {
        hideInputError(formElement, inputElement, config)
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement, config)
    } else {
      enableSubmitButton(buttonElement, config)
    }
  }

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, config)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config)
            
        })
    })
}

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault()
        })
        setEventListeners(formElement, config)
    })
}

export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const submitButton = formElement.querySelector(config.submitButtonSelector)
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config)
    })
    disableSubmitButton(submitButton, config)
  }

const disableSubmitButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass)
  button.disabled = true
}

const enableSubmitButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass)
  button.disabled = false
}
