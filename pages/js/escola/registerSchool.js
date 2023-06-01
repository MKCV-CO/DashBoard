import { clearFields } from "../components.js";
import { postSchool } from "./postSchool.js";

export const registerSchool = async () => {
    document.getElementById('register-school').addEventListener('click', async () => {
        postSchool();
        clearFields('text-input')
    })
} 