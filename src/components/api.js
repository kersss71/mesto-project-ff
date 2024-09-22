const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
	headers: {
		authorization: '8c676eb5-284e-43af-b9a7-a68978e0ef43',
		'Content-Type': 'application/json',
	},
};

function checkResponse(res, err) {
	if (res.ok) {
        return res.json()
    }
	return Promise.reject(err)
}

export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса информации о профиле.`))
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса карточек.`))
}

export const updateProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса изменения профиля.`))

}

export const newCardRequest = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса на добавление карточки.`))

}

export const deleteCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса на удаление карточки.`))

}

export const addLikeRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса добавления лайка.`))

}

export const deleteLikeRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса удаления лайка.`))

}

export const updateAvatarRequest = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: link,
		}),
	})
    .then((res) => checkResponse(res, `Ошибка: ${res.status} во время запроса на изменение аватарки.`))
    }