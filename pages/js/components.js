'use strict' 

export const clearTable = (table) => {
    const rows = document.querySelectorAll(`#${table}>tbody tr`)
    rows.forEach(row => row.parentElement.removeChild(row))
}

export const clearFields = (classes) => {
    const fields = document.querySelectorAll(`.${classes}`);
    fields.forEach(field => {
        if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
            field.value = "";
        }
    });
};

export const clearSelect = () => {
    const selectElement = document.querySelector('.teste1');
    console.log(selectElement);
    selectElement.selectedIndex = 0;
}