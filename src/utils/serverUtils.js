const fetchPost = params => {
    const getBody = (params) => params ? JSON.stringify(params) : null
    const url = 'https://vk.andreyag.ru/photos.php'
    return fetch(url, {method: 'POST', body: getBody(params)}).then(r => r.json())
}

export {fetchPost}