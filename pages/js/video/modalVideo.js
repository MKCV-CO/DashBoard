import { postVideo } from '../video/postVideo.js';

export const modalVideo = () => {
    const openModal = () => document.getElementById('modal')
        .classList.add('active-class')

    const closeModal = () => document.getElementById('modal')
        .classList.remove('active-class')


    document.getElementById('edit-video').addEventListener('click', openModal)
    document.getElementById('cancel-edit').addEventListener('click', closeModal)
    document.getElementById('modalClose').addEventListener('click', closeModal)
    document.getElementById('btn_register_video').addEventListener('click', async () => {
        postVideo()
    })

} 