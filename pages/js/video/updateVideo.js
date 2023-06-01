import { putVideo } from "./putVideo.JS";

export const updateVideo = async () => {
    document.getElementById('save-edit').addEventListener('click', async () => {
        putVideo();
    })
} 