'use strict'

import { successToast } from "../components.js"
import { getDataCompany, createRowCompany } from "./getCompany.js"



const clearTable = () => {
    const rows = document.querySelectorAll(`#table_company > tbody tr`)
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTableCompany = async () => {
    const dataCompany = await getDataCompany();
    clearTable()
    dataCompany.forEach(createRowCompany)
}

export const excludeCompany = async () => {
    const idCompany = localStorage.getItem('deletedCompany')
    const dataBody = await getDataCompany()

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `https://api-culturalpath.up.railway.app/v1/cultural-path/empresa/${idCompany}`;
    const response = await fetch(url, initDelete);
    const company = await response.json()
    successToast('EMPRESA DELETADA', 'A empresa parceira foi deletada do sistema!')
    await updateTableCompany()
    return company;
}

