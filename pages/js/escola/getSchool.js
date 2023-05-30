'use strict'

import { clearTable } from "../components.js"

const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escola'    
    const response = await fetch(url)
    const school = await response.json()
    console.log(school.dadosEscolas);
    return school.dadosEscolas;
}


const getDataSchool = async () => {
    const dataSchool = await getSchool();
    let listValues = []
    let jsonSchool = {}

    const values = dataSchool.map(data => {
        jsonSchool.id = data.escola.id,
        jsonSchool.nome = data.escola.nome,
        jsonSchool.cnpj =  data.escola.cnpj
        jsonSchool.telefone = data.escola.telefone,
        jsonSchool.email = data.escola.email,
        jsonSchool.responsavel = data.escola.responsavel,
        jsonSchool.cep = data.endereco.map(element => {
            return element.cep
        })
        listValues.push(jsonSchool)
    })
    return listValues
}


const createRow = (school) => {
    const tableBody = document.getElementById('tbody-school');
    console.log(tableBody);

    const newRow = document.createElement('tr')
    newRow.classList.add("fields-table-main")

    newRow.innerHTML = `
        <td>${school.nome}</td>
        <td>${school.cnpj}</td>
        <td>${school.telefone}</td>
        <td>${school.email}</td>
        <td>${school.responsavel}</td>
        <td class="field-table-main">${school.cep}</td>
        <td>
            <button id="edit-school-${school.id}" class="edit-button" title="Editar Voluntário"><i
                    class="fas fa-edit"></i></button>
            <button id="delete-school-${school.id}" class="delete-button" title="Excluir Voluntário"><i
                    class="fas fa-trash"></i></button>
        </td>
    `
    tableBody.append(newRow)

}


 
export const updateTable = async () => {
    const dataSchool = await getDataSchool();
    clearTable()
    dataSchool.forEach(createRow)
 
}



