'use strict'
import { editEvent, modalEvent } from "./editEvent.js"
import { excludeEvent } from "./excludeEvent.js"
import { getEvent } from "./methods.js"

const editDelete = async (event) => {
    if (event.target.tagName == 'BUTTON') {
        const [action, index] = event.target.dataset.event.split('-')
        localStorage.setItem('deletedEvent', index)
        if (action == 'edit') {
            modalEvent()
            await editEvent(index)
        } else if (action == 'delete') {
            if(confirm('Tem certeza que deseja deletar esse evento?')){
                excludeEvent(index)
            }
        }
 
    }
}

export const createRowRecords = (event) => {
    const tableBody = document.querySelector('#table_records tbody')

    const newRow = document.createElement('tr')
    newRow.classList.add("fields-table-main")
    newRow.addEventListener('click', editDelete)

    newRow.innerHTML = `
        <td>${event.id}</td>
        <td>${event.nome}</td>
        <td>${event.tema}</td>
        <td>${event.objetivo}</td>
        <td>${event.data_palestra}</td>
        <td>
            <button id="edit-event" data-event="edit-${event.id}"  class="edit-button" title="Editar evento">Editar</button>
            <button id="delete-event" data-event="delete-${event.id}" class="delete-button" title="Excluir evento">Excluir</button>
        </td>
    `
    tableBody.append(newRow)
}


export const createTableEvents = async () => {
    const dataEvents = await getEvent();
    dataEvents.forEach(createRowRecords)
}