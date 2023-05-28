'use strict'

import { updateTable } from "./getSchool.js"
import { postSchool } from "./postSchool.js"

export const modalClass = () => {
    const openModal = () => document.getElementById('modal')
        .classList.add('active-class')

    const closeModal = () => document.getElementById('modal')
        .classList.remove('active-class')

    // document.getElementById('edit-school').addEventListener('click', openModal)
    document.getElementById('cancel-edit').addEventListener('click', closeModal)
    document.getElementById('modalClose').addEventListener('click', closeModal)
    document.getElementById('register-school').addEventListener('click', postSchool)
    document.getElementById('register-school').addEventListener('click', updateTable) 
    
} 
