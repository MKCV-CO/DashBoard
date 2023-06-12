'use strict'

import { successToast } from "../components.js";
import { getDataSchool } from "./getSchool.js";
import { updateTableSchool } from "./postSchool.js";

export const excludeSchool = async () => {
    const idSchool = localStorage.getItem('deletedSchool')    
    const dataBody = await getDataSchool()

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/escola/${idSchool}`;
    
    const response = await fetch(url, initDelete);
    const video = await response.json()
    successToast('ESCOLA DELETADA', 'A escola foi deletada do sistema!')
    updateTableSchool()
    return video;
}

