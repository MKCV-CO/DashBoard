'use strict'

import { excludeVoluntary } from "./deleteVoluntary.js";

const getVoluntary = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/voluntario';
    const response = await fetch(url);
    const voluntary = await response.json();
    if (voluntary.status == '200') {
        return voluntary.dadosVoluntarios;
    } else {
        return 'Not Found'
    }
}

export const getDataVoluntary = async () => {
    const dataVoluntary = await getVoluntary();
    let jsonVoluntary = {}
    let listVoluntary = []

    dataVoluntary.map(element => {  
        jsonVoluntary = {
            id: element.voluntario.id,
            nome: element.voluntario.nome,
            cpf: element.voluntario.cpf,
            telefone: element.voluntario.telefone,
            email: element.voluntario.email, 
            idade: element.voluntario.idade,
            foto: element.voluntario.foto_rg,
        }
        listVoluntary.push(jsonVoluntary)  
    })
    return listVoluntary
}


const editDelete = (event) => {
    if (event.target.tagName == 'BUTTON') {
        const [action, index] = event.target.dataset.number.split('-')
        localStorage.setItem('deletedVoluntary', index)
        if (action == 'delete') {
            console.log('oi');
            excludeVoluntary(index);
        }
    }
}

export const createRowVoluntary = (voluntary) => {
    const tableBody = document.querySelector('#table_voluntary tbody')

    const newRow = document.createElement('tr')
    newRow.classList.add("fields-table-main")
    newRow.addEventListener('click', editDelete)

    newRow.innerHTML = `
        <td>${voluntary.id}</td>
        <td>${voluntary.nome}</td>
        <td>${voluntary.cpf}</td>
        <td>${voluntary.telefone}</td>
        <td>${voluntary.email}</td>
        <td>${voluntary.idade}</td>
        <td>${voluntary.foto}</td>
        <td>
            <button id="delete-voluntary" data-number="delete-${voluntary.id}" class="delete-button" title="Excluir Voluntário">Excluir</button>
        </td>
    `
    tableBody.append(newRow)
}

export const createTableVoluntary = async () => {
    const allVoluntary = await getDataVoluntary();
    allVoluntary.forEach(createRowVoluntary)
}

