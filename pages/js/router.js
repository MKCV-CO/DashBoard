'use strict'

import { searchAdress } from './escola/viacep.js'
import { modalClass } from './escola/modalSchool.js';
import { modalVideo } from './video/modalVideo.js';



const routes = {
    "/": "../pages/index.html",
    "/voluntario": "../pages/voluntario/voluntario.html",
    "/empresa": "../pages/empresa/empresa.html",
    "/escolas": "../pages/escola/escola.html",
    "/calendario": "../pages/calendario/calendario.html",
    "/video": "../pages/video/videos.html"
}

export const route = async() => {
    window.event.preventDefault();
    window.history.pushState({}, "", window.event.target.href);
    const path = window.location.pathname;
    const route = routes[path];
    const response = await fetch(route);
    const html = await response.text();
    document.getElementById("root").innerHTML = html;
    pathName(path);

}

const pathName = async (path) => {
    if(path == '/escolas'){
        searchAdress(),
        modalClass()
    }else if(path == '/video'){
        modalVideo()
    }
}
 

window.route = route;