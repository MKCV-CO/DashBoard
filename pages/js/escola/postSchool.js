import { createRowSchool, getDataSchool } from "./getSchool.js"


const isValidFields = () => document.getElementById('form-register').reportValidity()

const getValuesForm = () => {
    if (isValidFields()) {
        const newSchool = {
            escola: {
                nome: document.getElementById('nome-escola').value,
                cnpj:  document.getElementById('cnpj-escola').value,
                telefone: document.getElementById('telefone-escola').value,
                email: document.getElementById('email-escola').value,
                responsavel: document.getElementById('responsavel-escola').value,
            },
            endereco: {
                cep: document.getElementById('cep-escola').value,
                complemento: "null",
                numero: document.getElementById('numero-escola').value,
                logradouro:  document.getElementById('logradouro-escola').value,
                bairro:  document.getElementById('bairro-escola').value,
                cidade:  document.getElementById('cidade-escola').value,
                estado: document.getElementById('estado-escola').value
            }
        }
        console.log("Dados chegando no input: " + newSchool);
        return newSchool
   }    
    else{
        return false
    }
    
}

const clearTable = () => {
    const rows = document.querySelectorAll(`#table_school>tbody tr`)
    rows.forEach(row => row.parentNode.removeChild(row))
}

export const updateTableSchool = async() =>{
    const dataSchool = await getDataSchool()
    console.log(dataSchool);
    clearTable()
    dataSchool.forEach(createRowSchool)
}


export const postSchool = async () => {
    const dataBody = getValuesForm()
    console.log('Dados no Body: ' + dataBody);

    const initPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = 'http://localhost:8080/v1/cultural-path/escola';
    const respose = await fetch(url, initPost); 
    const school = await respose.json()
    alert('Escola adicionada no sistema!');
    await updateTableSchool()
    return school;
}

