'use strict'

import { getVideos } from "./getVideos.js";
import { updateTableVideos } from "./postVideo.js";

const fillFields = (video) => {
    const idVideo = video.id
    localStorage.setItem('db_video', idVideo);
    document.getElementById('titulo-video').value = video.titulo;
    document.getElementById('desc-edit-video').value = video.descricao;
    document.getElementById('url-edit-video').value = video.url;
}

export const editVideo = async (index) => {
    const videos = await getVideos()
    const changeIndex = [];

    videos.forEach(element => {
        changeIndex[element.id] = element;
    });
    
    const detailVideo = changeIndex[index];

    fillFields(detailVideo)

}

export const modalVideo = () => {
    const modal = document.getElementById('modal-video');
    const openModal = () => modal.classList.add('active-class');
    const closeModal = () => modal.classList.remove('active-class');

    const buttonsEdit = document.querySelectorAll('#edit-video');
    buttonsEdit.forEach(button => {
        button.addEventListener('click', async () => {
            openModal();
        });
    })

    const cancelingEdit = () => {
        document.getElementById('cancel-edit')
            .addEventListener('click', closeModal);

        document.getElementById('modalClose')
            .addEventListener('click', closeModal)
    
        document.getElementById('save-edit')
            .addEventListener('click', closeModal)
        };


    cancelingEdit();
};

const dataVideo = async () => {
    const titleVideo = document.getElementById('titulo-video').value
    const descVideo = document.getElementById('desc-edit-video').value
    const URLVideo = document.getElementById('url-edit-video').value


    if (dataVideo) {
        const putVideo = {
            titulo: titleVideo,
            descricao: descVideo,
            url: URLVideo
        }
        return putVideo
    } else {
        return false
    }
}

export const putVideo = async () => {
    const dataBody = await dataVideo()
    const idVideo =  localStorage.getItem('db_video');


    const initPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/videos-infantil/${idVideo}`;
    const respose = await fetch(url, initPut);
    const video = await respose.json()
    alert('Video atualizado no sistema!');
    await updateTableVideos()
    return video;
}

