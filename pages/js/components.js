'use strict' 

export const clearTable = (table) => {
    const rows = document.querySelectorAll(`#${table}>tbody tr`)
    rows.forEach(row => row.parentElement.removeChild(row))
}


export const clearFields = (classes) => {
    const fields = document.querySelectorAll(`.${classes}`)
    fields.forEach(field => {
        field.value = ""
    })
}
