'use strict'

import { updateTable } from "./getSchool.js"
import { postSchool } from "./postSchool.js"

export const modalClass = () => {
    const openModal = () => document.getElementById('modal')
        .classList.add('active-class')

    const closeModal = () => document.getElementById('modal')
        .classList.remove('active-class')

    const editDelete = (event) => {
        if (event.target.type == 'button') {
            const [action, index] = event.target.id.split('-')
            if (action == 'edit') {
                editSchool(index)
            }
        }
    }

    const fillFields = (school) => {
        document.getElementById('edit-nome-escola').value = school.nome;
        document.getElementById('edit-email-escola').value = school.email;
        document.getElementById('edit-cnpj-escola').value = school.cnpj;
        document.getElementById('edit-telefone-escola').value = school.telefone;
        document.getElementById('edit-responsavel-escola').value = school.responsavel;
        document.getElementById('edit-cep-escola').value = school.cep;
    }

    const editSchool = (index) => {
        const school = getSchool()[index]
        openModal()
        fillFields(school)
    }

    document.getElementById('edit-school').addEventListener('click', openModal)
    document.getElementById('cancel-edit').addEventListener('click', closeModal)
    document.getElementById('modalClose').addEventListener('click', closeModal)
    document.querySelector('#table-school>tbody').addEventListener('click', editDelete)

} 
