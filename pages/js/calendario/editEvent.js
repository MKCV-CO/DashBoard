import { infoToast, successToast } from "../components.js";
import { getEvent } from "./methods.js";
import { createRowRecords } from "./records-calendar.js";

const fillFields = async (event) => {
    document.getElementById('theme-event').value = event.tema;
    document.getElementById('objective-event').value = event.objetivo;

    const brDate = event.data_palestra;
    const parts = brDate.split('/');
    const usDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  
    document.getElementById('data-event').value = usDate;
    infoToast('INSIRA NOVAMENTE A ESCOLA', 'Insira a escola novamente no para editar!')
  }
const clearTable = () => {
    const rows = document.querySelectorAll(`#table_records>tbody tr`)
    rows.forEach(row => row.parentNode.removeChild(row))
}

export const updateTableEvents = async() =>{
    const dataSchool = await getEvent()
    clearTable()
    dataSchool.forEach(createRowRecords)
}


export const editEvent = async (index) => {
    const event = await getEvent()
    const changeIndex = [];
    event.forEach(element => {
        changeIndex[element.id] = element;
    });
    const detailEvent = changeIndex[index];
    fillFields(detailEvent)
}

export const modalEvent = async () => {

    const modal = document.getElementById('modal-records-events');
    const openModal = () => {
        modal.classList.add('active-class')
    }
    const closeModal = () => modal.classList.remove('active-class');

    const buttonsEdit = document.querySelectorAll('#edit-event');
    buttonsEdit.forEach(button => {
        button.addEventListener('click', async () => {
            openModal();
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

const getSelectedValue = () => {
    const comboBoxSchool = document.getElementById('modalSelectedSchool');
    const selectedValue = comboBoxSchool.value;
    const parts = selectedValue.split('-');
    const id = parseInt(parts[1].trim())
    return id;
};

const dataEvent = () => {
    const schoolSelected =  getSelectedValue()
    const themeEvent = document.getElementById('theme-event').value
    const objectiveEvent = document.getElementById('objective-event').value
    const dateEvent = document.getElementById('data-event').value

    if (dataEvent) {
        const putEvent = {
            tema: themeEvent,
            objetivo: objectiveEvent,
            data_palestra: dateEvent,
            id_escola:schoolSelected
        }
        return putEvent
    } else {
        return false
    }
}

export const putEvent = async () => {
    const dataBody =  dataEvent()
    const idEvent = localStorage.getItem('editEvent')

    const initPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    
    const url = `https://api-culturalpath.up.railway.app/v1/cultural-path/palestra/${idEvent}`;
    const respose = await fetch(url, initPut);
    const palestra = await respose.json()
    infoToast('EVENTO EDITADO', 'O evento foi editado')
    updateTableEvents()
    return palestra;


}