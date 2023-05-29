const isValidFields = () => document.getElementById('form-videos').reportValidity()

const getValuesForm = () => {
    if (isValidFields()) {
        const newVideo = {
            titulo: document.getElementById('nome-video').value,
            descricao: document.getElementById('desc-video').value,
            url: document.getElementById('url-video').value
        }
        return newVideo
    } else {
        return false
    }

}

const clearFields = () => {
    const fields = document.querySelectorAll('.text-input')
    fields.forEach(field => {
        field.value = ""
    })
}


export const postVideo = async () => {
    const dataBody = getValuesForm()
 
    const initPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = 'http://localhost:8080/v1/cultural-path/videos-infantil';
    const respose = await fetch(url, initPost);
    const video = await respose.json()
    alert('Video adicionada no sistema!');
    clearFields()
    return video;
}