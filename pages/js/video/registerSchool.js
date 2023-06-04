import { postVideo } from '../video/postVideo.js';
import { clearFields } from "../components.js"

export const registerVideo = async () => {
    document.getElementById('btn_register_video').addEventListener('click', async () => {
        postVideo();
        clearFields('text-input')
    })
} 