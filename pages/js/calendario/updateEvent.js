'use strict'

import { putEvent } from "./editEvent.js"

export const editEvent = async () => {
    document.getElementById('save-edit').
        addEventListener('click', () => putEvent())
}