//Função para criar os dados dinamicamente da tabela
const createRow = (school) => {
    const tableBody = document.querySelector('#table-school>tbdoy') 

    const newRow = document.createElement('tr').classList.add('fields-table-main')

    newRow.innerHTML = `
        <td>${school.nome}</td>
        <td>${school.cnpj}</td>
        <td>${school.telefone}</td>
        <td>${school.email}</td>
        <td>${school.resposavel}</td>
        <td class="field-table-main">${school.cep}</td>
        <td>
            <button id="edit-school" class="edit-button" title="Editar Voluntário"><i
                    class="fas fa-edit"></i></button>
            <button id="delete-school" class="delete-button" title="Excluir Voluntário"><i
                    class="fas fa-trash"></i> </button>
        </td>
    `
    tableBody.appendChild(newRow)

}

//Função para limpar os dados da tabela sempre que criado uma nova escola
const clearTable = () => {
    const rows = document.querySelectorAll('#table-school>tbody tr')
    rows.forEach(row => row.parentElement.removeChild(row))
}

//Função para atualizar a tabela assim que cadastrar uma nova escola
export const updateTable = async () => {
    const dataSchool = await getSchool();
    clearTable()
    dataSchool.forEach(createRow)
}


//Função para carregar todas as escolas cadastradas no sistema
const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escolas'
    const respose = await fetch(url)
    const school = respose.json()
    return {
        nome: school.escola.nome,
        cnpj: school.escola.cnpj,
        telefone: school.escola.telefone,
        email: school.escola.email,
        resposavel: school.escola.resposavel,
        cep: school.endereco.cep
    }
}