'use strict'

import { editVideo, modalVideo } from "./putSchool.js";
import { excludeVideo } from "./deleteVideo.js";


export const getVideos = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/videos-infantil';
    const response = await fetch(url);
    const videos = await response.json();
    if (videos.status == '200') {
        return videos.videos;
    } else {
        return 'Not Found'
    }
}

export const getDataVideos = async () => {
    const dataVideos = await getVideos();


    dataVideos.map(element => {
        return [
            element.id,
            element.titulo,
            element.descricao,
            element.url
        ]
    })
    console.log(dataVideos);
    return dataVideos
}


const editDelete = (event) => {
    if (event.target.tagName == 'BUTTON' || event.target.tagName == 'I') {
        const [action, index] = event.target.dataset.number.split('-')
        localStorage.setItem('clickVideo', index)
        localStorage.setItem('deletedVideo', index)
        if (action == 'edit') {
            modalVideo();
            editVideo(index);
        } else if (action == 'delete') {
            excludeVideo(index);
        }
    }
}

export const createRowVideo = (video) => {

    const tableBody = document.querySelector('#table_videos tbody')

    const newRow = document.createElement('tr')
    newRow.classList.add("fields-table-main")
    newRow.addEventListener('click', editDelete)

    newRow.innerHTML = `
        <td>${video.id}</td>
        <td>${video.titulo}</td>
        <td>${video.descricao}</td>
        <td>${video.url}</td>
        <td>
            <button id="edit-video" class="edit-button" data-number="edit-${video.id}" title="Editar Video">Editar</i></button>
            <button id="delete-video" data-number="delete-${video.id}" class="delete-button" title="Excluir Voluntário">Excluir</button>
        </td>
    `
    tableBody.append(newRow)
}

export const createTableVideos = async () => {
    const allVideos = await getDataVideos();
    allVideos.forEach(createRowVideo)
}

