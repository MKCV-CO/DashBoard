'use strict'

import { getDataSchool } from "./getSchool.js";
import { updateTableSchool } from "./postSchool.js";

export const excludeSchool = async () => {
    const idVideo = localStorage.getItem('deletedSchool')                                                                                                                                   
    const dataBody = await getDataSchool()
    console.log(dataBody);
   

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/videos-infantil/${idVideo}`;
    const respose = await fetch(url, initDelete);
    const video = await respose.json()
    alert('Video deletado no sistema!');
    await updateTableSchool()
    return video;
}

