'use strict'

import { getDataSchool } from "./getSchool.js";
import { updateTableSchool } from "./postSchool.js";
import { searchAdress } from "./viacep.js";

const fillFields = async (school) => {
    const idSchool = school.id
    const id_endereco =  school.id_endereco
    const id_cidade = school.id_cidade
    const id_estado =  school.id_estado

    localStorage.setItem('id_endereco', id_endereco)
    localStorage.setItem('id_cidade', id_cidade)
    localStorage.setItem('id_estado', id_estado)
    localStorage.setItem('db_school', idSchool);

    document.getElementById('edit-nome-escola').value = school.nome;
    document.getElementById('edit-email-escola').value = school.email;
    document.getElementById('edit-cnpj-escola').value = school.cnpj;
    document.getElementById('edit-telefone-escola').value = school.telefone;
    document.getElementById('edit-responsavel-escola').value = school.responsavel;
    document.getElementById('edit-cep-escola').value = school.cep;
}

export const editSchool = async (index) => {
    const schools = await getDataSchool()
    const changeIndex = [];

    schools.forEach(element => {
        changeIndex[element.id] = element;
    });

    const detailVideo = changeIndex[index];
    fillFields(detailVideo)
}


export const modalSchool = () => {
    const modal = document.getElementById('modal-school');
    const openModal = () => {
        modal.classList.add('active-class')
        searchAdress()
    }
    const closeModal = () => modal.classList.remove('active-class');

    const buttonsEdit = document.querySelectorAll('#edit-school');
    buttonsEdit.forEach(button => {
        button.addEventListener('click', async () => {
            openModal();
            searchAdress()
        });
    })

    const cancelingEdit = () => {
        document.getElementById('cancel-edit')
            .addEventListener('click', closeModal);

        document.getElementById('modalClose')
            .addEventListener('click', closeModal)

        document.getElementById('save-edit')
            .addEventListener('click', closeModal)
    };


    cancelingEdit();
};

const dataSchool = () => {
    const nameSchool = document.getElementById('edit-nome-escola').value
    const emailSchool = document.getElementById('edit-email-escola').value
    const CNJPJSchool = document.getElementById('edit-cnpj-escola').value
    const phoneSchool = document.getElementById('edit-telefone-escola').value
    const respSchool = document.getElementById('edit-responsavel-escola').value
    const cepSchool = document.getElementById('edit-cep-escola').value
    const streetSchool = document.getElementById('edit-logradouro-escola').value 
    const hoodSchool = document.getElementById('edit-bairro-escola').value
    const citySchool = document.getElementById('edit-cidade-escola').value 
    const stateSchool = document.getElementById('edit-estado-escola').value
    const numberSchool = document.getElementById('edit-numero-escola').value
    const id_endereco = localStorage.getItem('id_endereco')
    const id_cidade = localStorage.getItem('id_cidade')
    const id_estado = localStorage.getItem('id_estado')

    if (dataSchool) {
        const putSchool = {
            escola: {
                nome: nameSchool,
                email: emailSchool,
                cnpj: CNJPJSchool,
                telefone: phoneSchool,
                responsavel: respSchool
            },
            endereco: {
                logradouro: streetSchool,
                cep: cepSchool,
                numero: numberSchool,
                cidade: citySchool,
                complemento: 'null',
                bairro: hoodSchool,
                estado: stateSchool,
                id_endereco: id_endereco,
                id_estado: id_estado,
                id_cidade: id_cidade
            }
        }
        return putSchool
    }else{
        return false
    }
}

export const putSchool = async () => {
    const dataBody = dataSchool()

    const idSchool =  localStorage.getItem('db_school');

    const initPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/escola/${idSchool}`;
    const respose = await fetch(url, initPut);
    const video = await respose.json()
    alert('Video atualizado no sistema!');
    await updateTableSchool()
    return video;
}

