import { putVideo } from "./putSchool.js";

export const updateVideo = async () => {
    document.getElementById('save-edit').addEventListener('click', async () => {
        putVideo();
    })
} 