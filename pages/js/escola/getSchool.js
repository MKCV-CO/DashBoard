//Função para atualizar a tabela assim que cadastrar uma nova escola
const updateTable = () => {
    const dataSchool = 
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