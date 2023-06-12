'use strict'

export const getSchool = async () => {
    const url = 'https://api-culturalpath.up.railway.app/v1/cultural-path/escola'
    const response = await fetch(url)
    const school = await response.json()
    const schools = school.dadosEscolas
    return schools;
}
export const getEvent = async () => {
    const url = "https://api-culturalpath.up.railway.app/v1/cultural-path/palestra";
    const response = await fetch(url);
    const palestra = await response.json();

    const eventos = palestra.palestras.map((evento) => {
        const dataPalestra = new Date(evento.data_palestra);
        const dia = dataPalestra.getDate() + 1;
        const mes = dataPalestra.getMonth() + 1;
        const ano = dataPalestra.getFullYear();

        const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;

        return {
            ...evento,
            data_palestra: dataFormatada
        };
    });

    return eventos;
};

export const getEventDate = async () => {
    const url = "https://api-culturalpath.up.railway.app/v1/cultural-path/palestra";
    const response = await fetch(url);
    const palestra = await response.json();
    const dates = palestra.palestras.map(event => {
        const [date, time] = event.data_palestra.split('T')
        return date
    });
    console.log(dates);
    return dates
};


