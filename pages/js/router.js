'use strict'

import { cep } from './index.js'

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
    console.log(window.event.target)
    const path = window.location.pathname;
    const route = routes[path];
    console.log(path);
    console.log(route);


    const response = await fetch(route);
    const html = await response.text();

    document.getElementById("root").innerHTML = html;

    if (path == '/escolas') {
        console.log('escolas');
        cep()
    }

};



window.route = route;