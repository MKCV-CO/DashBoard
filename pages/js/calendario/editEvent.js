import { getEvent } from "./methods.js";
import { createRowRecords } from "./records-calendar.js";

const fillFields = async (event) => {
    console.log(event);
    document.getElementById('school-name').value = event.nome;
    document.getElementById('theme-event').value = event.tema;
    document.getElementById('objective-event').value = event.objetivo;
    document.getElementById('data-event').value = event.data_palestra;
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

export const modalEvent = () => {
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

const dataEvent = () => {
    const schoolSelected = document.getElementById('school-name').value
    const themeEvent = document.getElementById('theme-event').value
    const objectiveEvent = document.getElementById('objective-event').value
    const dateEvent = document.getElementById('data-event').value

    if (dataEvent) {
        const putEvent = {

        }
        return putEvent
    } else {
        return false
    }
}

export const putEvent = async () => {

    const dataBody = dataEvent()

    const idEvent = localStorage.getItem('event')

    const initPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }


}