'use strict'

import { getDataSchool } from "./getSchool.js";
import { updateTableSchool } from "./postSchool.js";

export const excludeSchool = async () => {
    const idSchool = localStorage.getItem('deletedSchool')    
    console.log(idSchool);
                                                                                                                                   
    const dataBody = await getDataSchool()
    console.log(dataBody);
   

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    console.log(initDelete.body);
    

    const url = `http://localhost:8080/v1/cultural-path/escola/${idSchool}`;
    console.log(url);
    
    const response = await fetch(url, initDelete);
    const video = await response.json()
    alert('Video deletado no sistema!');
    updateTableSchool()
    return video;
}

