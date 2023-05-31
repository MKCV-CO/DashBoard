'use strict'

import { getDataVideos } from "./getVideos.js";

export const deleteVideo = async (index) => {
    const videos = await getDataVideos()
    const changeIndex = [];

    videos.forEach(element => {
        changeIndex[element.id] = element;
    });
    
    const detailVideo = changeIndex[index];
    localStorage.setItem('deleteVideo', detailVideo.id)
}


export const excludeVideo = async () => {
    const idVideo = localStorage.getItem('deleteVideo')
    console.log(idVideo);
    
    const dataBody = await getDataVideos()

    console.log(dataBody);
    
    
    const initPut = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/videos-infantil`;
    const respose = await fetch(url, initPut);
    const video = await respose.json()
    alert('Video atualizado no sistema!');
    await updateTableVideos()
    return video;
}

