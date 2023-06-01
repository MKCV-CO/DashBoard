import { putSchool } from "./putSchool.js";


export const updateSchool = async () => {
    document.getElementById('save-edit').addEventListener('click', async () => {
        putSchool();
    })
} 