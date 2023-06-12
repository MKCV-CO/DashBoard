'use strict'

import { successToast } from "../components.js"
import { createRowVideo } from "./getVideos.js"
import { getDataVideos } from "./getVideos.js"

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

const clearTable = () => {
    const rows = document.querySelectorAll(`#table_videos>tbody tr`)
    rows.forEach(row => row.parentNode.removeChild(row))
}

export const updateTableVideos = async () => {
    const dataVideos = await getDataVideos();
    clearTable()
    dataVideos.forEach(createRowVideo)
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
    successToast('VIDEO ADICIONADO', 'O vídeo foi adicionado ao sistema!')
    updateTableVideos()
    return video;
}