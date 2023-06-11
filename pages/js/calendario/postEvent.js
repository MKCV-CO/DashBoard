'use strict'

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

        const url = 'http://localhost:8080/v1/cultural-path/palestra';
        const response = await fetch(url, initPost);
        const palestra = await response.json();
        alert('Palestra adicionada no sistema!');
        updateTableEvents();

        return palestra;
    } else {
        // TOAST CASO DATA JA EXISTA DENTRO DO BANCO DE DADOS
        alert('Data da palestra ja cadastrada no sistema! Tente outra data')
        return null;
    }
}
