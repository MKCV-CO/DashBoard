'use strict'

import { clearFields, clearSelect } from "../components.js"
import { postEvent } from "./postEvent.js"

export const registerEvent = () => {
    document.getElementById('btn_register_event')
        .addEventListener('click', async () => {
            await postEvent();
            clearSelect()
            clearFields('text-input')
        })
}