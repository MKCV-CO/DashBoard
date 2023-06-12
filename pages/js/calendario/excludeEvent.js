'use strict'

import { successToast } from "../components.js";
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

    const url = `https://api-culturalpath.up.railway.app/v1/cultural-path/palestra/${idEvent}`;
    const response = await fetch(url, initDelete);
    const video = await response.json()
    successToast('PALESTRA DELETADA', 'Palestra deletada com sucesso!')
    updateTableEvents()
    return video;
}
