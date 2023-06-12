import { successToast } from "../components.js"
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
    clearTable()
    dataSchool.forEach(createRowSchool)
}


export const postSchool = async () => {
    const dataBody = getValuesForm()

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
    successToast('ESCOLA ADICIONADA', 'A escola foi adicionada ao sistema!')
    updateTableSchool()
    return school;
}

