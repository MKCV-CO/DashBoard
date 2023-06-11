'use strict'

import { excludeSchool } from "./deleteSchool.js"
import { editSchool, modalSchool } from "./putSchool.js"

const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escola'
    const response = await fetch(url)
    const school = await response.json()
    return school.dadosEscolas;
}


export const getDataSchool = async () => {
    const dataSchool = await getSchool();

    const listValues = []
    let jsonSchool = {}

    const values = dataSchool.map(data => {
        const adressSchool = data.endereco[0];
        
        jsonSchool = {
            id: data.escola.id,
            nome: data.escola.nome,
            cnpj: data.escola.cnpj,
            telefone: data.escola.telefone,
            email: data.escola.email,
            responsavel: data.escola.responsavel,
            cep: adressSchool.cep.toString(),
            logradouro: adressSchool.logradouro,
            bairro: adressSchool.bairro.toString(),
            cidade: adressSchool.cidade.toString(),
            estado: adressSchool.estado.toString(),
            regiao: adressSchool.regiao.toString(),
            sigla_estado: adressSchool.sigla_estado.toString(),
            id_endereco: adressSchool.id_endereco,
            id_cidade: adressSchool.id_cidade,
            id_estado: adressSchool.id_estado,
        }
        listValues.push(jsonSchool)
    })
    
    return listValues
}

const editDelete = async(event) => {
    if (event.target.tagName == 'BUTTON') {
        const [action, index] = event.target.dataset.school.split('-')
        localStorage.setItem('deletedSchool', index)
        localStorage.getItem('deletedSchool', index)
        if (action == 'edit') {
            modalSchool()
            await editSchool(index)
        } else if (action == 'delete') {
            excludeSchool(index)
        }
    }
}

export const createRowSchool = (school) => {
    const tableBody = document.querySelector('#table_school tbody');

    const newRow = document.createElement('tr')
    newRow.classList.add("fields-table-main")
    newRow.addEventListener('click', editDelete)

    newRow.innerHTML = `
        <td>${school.nome}</td>
        <td>${school.cnpj}</td>
        <td>${school.telefone}</td>
        <td>${school.email}</td>
        <td>${school.responsavel}</td>
        <td class="field-table-main">${school.cep}</td>
        <td>
            <button id="edit-school" data-school="edit-${school.id}"  class="edit-button" title="Editar Voluntário">Editar</button>
            <button id="delete-school" data-school="delete-${school.id}" class="delete-button" title="Excluir Voluntário">Excluir</button>
        </td>
    `
    tableBody.append(newRow)
}


export const createTableSchool = async () => {
    const dataSchool = await getDataSchool();
    dataSchool.forEach(createRowSchool)
}