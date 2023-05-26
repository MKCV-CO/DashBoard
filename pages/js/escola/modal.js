'use strict'

export const modalClass = () => {
    const openModal = () => document.getElementById('modal')
        .classList.add('active-class')

    const closeModal = () => document.getElementById('modal')
        .classList.remove('active-class')

    document.getElementById('edit-school').addEventListener('click', openModal)
    document.getElementById('cancel-edit').addEventListener('click', closeModal)

    document.getElementById('modalClose').addEventListener('click', closeModal)


    const getSchool = () => (dbSchool) => localStorage.setItem('db_school', JSON.stringify(dbSchool));
    const setSchool = () => JSON.parse(localStorage.getItem('db_school')) ?? [];

    const readSchool = () => getLocalStorage()

    const updateSchool = (index, value) => {
        const valuesSchool = readSchool();
        valuesSchool[index] = value;
        setSchool[valuesSchool]
    }

    const deleteSchool = (index) => {
        const dbSchool = readSchool();
        dbSchool.splice(index, 1)
    }

    const createSchool = (school) => {
        const tbl_school = getSchool()
        tbl_school.push(school)
        setSchool(tbl_school)
    }

    const isValidField = () =>  {
        return document.getElementById('form-register').reportValidity()
    }

    const clearFields = () => {
        const fieldsModal = document.querySelectorAll('.modal-field')
        const fieldsRegister = document.querySelectorAll('.text-input')
        fieldsModal.forEach(input => {
            input.value = ''
        })
        fieldsRegister.forEach(input => {
            input.value = ''
        })

    }

    const saveSchool = (values) => {
        if(isValidField()){
            const school = {
                nome: document.getElementById('nome-escola').value,
                cpnj: document.getElementById('cnpj-escola').value,
                telefone: document.getElementById('telefone-escola').value,
                email: document.getElementById('email-escola').value,
                responsavel: document.getElementById('responsavel-escola').value,
                cep: document.getElementById('cep-escola').value
            }
            createSchool(school)
            clearFields()
            closeModal()
        }
    }

    const updateTable = () => {
        const dbSchool = readSchool()
        dbSchool.forEach(createRow => {
            
        });
    }

    document.getElementById('register-school').addEventListener('click', saveSchool)
} 
