'use strict'

import { videoClass } from "./modalVideo.js"

export const editDelete = (event) => {
    if (event.target.tagName == 'BUTTON' || event.target.tagName == 'I') {
        const [action, index] = event.target.dataset.number.split('-')
        if (action == 'edit') {
            videoClass()
        } else if (action == 'delete'){
            console.log(`delete video ${index}`);
        }
    }
}