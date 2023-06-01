'use strict'

const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escola'
    const response = await fetch(url)
    const school = await response.json()
    console.log(school);
    return school.dadosEscolas;

}


export const getDataSchool = async () => {
    const dataSchool = await getSchool();

    const listValues = []
    let jsonSchool = {}

    const values = dataSchool.map(data => {
        jsonSchool = {
            id: data.escola.id,
            nome: data.escola.nome,
            cnpj: data.escola.cnpj,
            telefone: data.escola.telefone,
            email: data.escola.email,
            responsavel: data.escola.responsavel,
            cep: data.endereco.map(element => element.cep)
        }
        listValues.push(jsonSchool)
    })
    return listValues
}

const editDelete = (event) => {
    if (event.target.tagName == 'BUTTON') {
        const [action, index] = event.target.dataset.school.split('-')
        console.log(action + `-${index}`);

        if (action == 'edit') {

        } else if (action == 'delete') {

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