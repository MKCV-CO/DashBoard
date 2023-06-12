'use strict'

import { errorToast, successToast } from "../components.js";
import { updateTableEvents } from "./editEvent.js";
import { getEventDate } from "./methods.js";

const isValidFields = () => document.getElementById('form-events').reportValidity();

const getSelectedValue = () => {
    const comboBoxSchool = document.getElementById('selectSchool');
    const selectedValue = comboBoxSchool.value;
    const parts = selectedValue.split('-');
    const id = parseInt(parts[1].trim())
    return id;
};

const getValuesForm = () => {
    if (isValidFields()) {
        const newEvent = {
            tema: document.getElementById('tema-evento').value,
            objetivo: document.getElementById('objetivo-evento').value,
            data_palestra: document.getElementById('data-evento').value,
            id_escola: getSelectedValue()
        }
        return newEvent
   }    
    else{
        return false
    }
}

export const validateDate = async () => {
    const dates = await getEventDate();
    const newEvent = getValuesForm();
    
    const userDate = newEvent.data_palestra;
    let isDuplicate = false;

    dates.forEach(date => {
        if (date === userDate) {
            isDuplicate = true;
            return;
        }
    });

    if (isDuplicate) {
        return false;
    } else {
        return true;
    }
}


 
export const postEvent = async () => {
    const dataBody = getValuesForm();
    const isValidDate = await validateDate();

    if (isValidDate) {
        const initPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBody)
        }

        const url = 'https://api-culturalpath.up.railway.app/v1/cultural-path/palestra';
        const response = await fetch(url, initPost);
        const palestra = await response.json();
        successToast('SUCESSO AO CADASTRAR', 'Palestra adicionada ao Banco de Dados')
        updateTableEvents();
        return palestra;
    } else {
        errorToast('ERRO AO CADASTRAR EVENTO', 'Já existe um evento com essa data!')
        return null;
    }
}
