'use strict'

export const modalClass = () => {
    const openModal = () => document.getElementById('modal')
        .classList.add('active-class')

    const closeModal = () => document.getElementById('modal')
        .classList.remove('active-class')

    document.getElementById('edit-school').addEventListener('click', openModal)

    document.getElementById('modalClose').addEventListener('click', closeModal)

    document.getElementById('cancel-edit').addEventListener('click', closeModal)
} 
