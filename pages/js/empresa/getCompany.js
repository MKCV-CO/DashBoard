'use strict'

import { excludeCompany } from "./deleteCompany.js";

const getCompany = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/empresa';
    const response = await fetch(url);
    const company = await response.json();
    if (company.status == '200') {
        return company.empresas;
    } else {
        return 'Not Found'
    }
}

export const getDataCompany = async () => {
    const dataCompany = await getCompany();
    let jsonCompany = {}
    let listCompany = []

    dataCompany.map(element => {  
        console.log(element);
        
        jsonCompany = {
            id: element.id,
            cnpj: element.cnpj,
            razao_social: element.razao_social,
            email: element.email,
            telefone: element.telefone, 
            mensagem: element.mensagem,
            tipo_contato: element.contato,
        }
        listCompany.push(jsonCompany)  
    })    
    return listCompany
}


const editDelete = (event) => {
    if (event.target.tagName == 'BUTTON') {
        const [action, index] = event.target.dataset.number.split('-')
        localStorage.setItem('deletedCompany', index)
        if (action == 'delete') {
            excludeCompany(index)
        }
    }
}


export const createRowCompany = (company) => {
    const tableBody = document.querySelector('#table_company tbody')

    const newRow = document.createElement('tr')
    newRow.classList.add("fields-table-main")
    newRow.addEventListener('click', editDelete)

    newRow.innerHTML = `
        <td>${company.id}</td>
        <td>${company.razao_social}</td>
        <td>${company.cnpj}</td>
        <td>${company.telefone}</td>
        <td>${company.email}</td>
        <td>${company.mensagem}</td>
        <td>${company.tipo_contato}</td>
        <td>
            <button id="delete-voluntary" data-number="delete-${company.id}" class="delete-button" title="Excluir Voluntário">Excluir</button>
        </td>
    `
    tableBody.append(newRow)
}

export const createTableCompany = async () => {
    const allVoluntary = await getDataCompany();
    allVoluntary.forEach(createRowCompany)
}


