'use strict'

export const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escola'
    const response = await fetch(url)
    const school = await response.json()
    const schools = school.dadosEscolas
    return schools;
}

export const getEvent = async () => {
    const url = "http://localhost:8080/v1/cultural-path/palestra"   
    const respose = await fetch(url)
    const palestra = await respose.json()
    console.log(palestra.palestras);
    return palestra
}


export const postLecture = async (dataBody) => {
    const initPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = 'http://localhost:8080/v1/cultural-path/palestra';
    const respose = await fetch(url, initPost);
    const palestra = await respose.json()
    alert('Palestra adicionada no sistema!');
    localStorage.setItem("idLecture", palestra.palestra.id) 
    return palestra
}

export const excludeEvent = async (dataBody, idPalestra) => {

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/videos-infantil/${idPalestra}`;
    const respose = await fetch(url, initDelete);
    const palestra = await respose.json()
    return palestra;
}
