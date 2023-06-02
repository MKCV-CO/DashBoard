'use strict'

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

    const url = `http://localhost:8080/v1/cultural-path/empresa/${idCompany}`;
    const response = await fetch(url, initDelete);
    const company = await response.json()
    alert('Empresa deletado no sistema!');
    await updateTableCompany()
    return company;
}

