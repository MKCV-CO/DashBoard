'use strict'

import { updateTableEvents } from "./editEvent.js";
import { getEvent } from "./methods.js";

export const excludeEvent = async () => {
    const idEvent = localStorage.getItem('deletedEvent')                                                                                                                               
    const dataBody = await getEvent()

    const initDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = `http://localhost:8080/v1/cultural-path/palestra/${idEvent}`;
    const response = await fetch(url, initDelete);
    const video = await response.json()
    alert('Evento deletado do sistema!');
    updateTableEvents()
    return video;
}
