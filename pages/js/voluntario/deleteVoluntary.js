'use strict'

import { getDataVoluntary } from "./getVoluntary.js"
import { createRowVoluntary } from "../voluntario/getVoluntary.js"


const clearTable = () => {
    const rows = document.querySelectorAll(`#table_voluntary>tbody tr`)
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTableVoluntary = async () => {
    const dataVoluntary = await getDataVoluntary();
    clearTable()
    dataVoluntary.forEach(createRowVoluntary)
}

export const excludeVoluntary = async () => {
    const idVoluntary = localStorage.getItem('deletedVoluntary')
    const dataBody = await getDataVoluntary()

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/voluntario/${idVoluntary}`;
    const respose = await fetch(url, initDelete);
    const video = await respose.json()
    alert('Voluntário deletado no sistema!');
    await updateTableVoluntary()
    return video;
}

