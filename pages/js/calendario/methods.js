'use strict'

export const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escola'
    const response = await fetch(url)
    const school = await response.json()
    const schools = school.dadosEscolas
    return schools;
}
export const getEvent = async () => {
    const url = "http://localhost:8080/v1/cultural-path/palestra";
    const response = await fetch(url);
    const palestra = await response.json();

    const eventos = palestra.palestras.map((evento) => {
        const dataPalestra = new Date(evento.data_palestra);
        const dataFormatada = dataPalestra.toLocaleDateString("pt-BR"); // Define o formato da data desejado

        return {
            ...evento,
            data_palestra: dataFormatada
        };
    });

    return eventos;
};


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
