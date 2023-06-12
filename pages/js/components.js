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
    const selectElement = document.querySelector('.text-input');
    selectElement.selectedIndex = 0;
}

export const errorToast = (title, message) => {
    iziToast.error({
        backgroundColor: '#FEB6BA',
        position: 'bottomRight',
        title: `${title}`,
        message: `${message}`,
      });
}

export const successToast = (title, message) => {
    iziToast.success({
        backgroundColor: '#AAFFA1',
        position: 'bottomRight',
        title: title,
        message: message,
      });
}

export const infoToast = (title, message) => {
    iziToast.info({
        backgroundColor: '#9ECED5',
        position: 'bottomRight',
        title: title,
        message: message,
      });
}


