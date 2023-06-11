'use strict'

import { searchAdress } from './escola/viacep.js'
import { createTableVideos } from './video/getVideos.js';
import { registerVideo } from './video/registerVideo.js';
import { updateVideo } from './video/updateVideo.js';
import { createTableSchool } from './escola/getSchool.js';
import { registerSchool } from './escola/registerSchool.js';
import { updateSchool } from './escola/updateSchool.js';
import { createTableVoluntary } from './voluntario/getVoluntary.js';
import { createTableCompany } from './empresa/getCompany.js';
import { createTableEvents } from './calendario/records-calendar.js';
import { getSelected } from './calendario/selected.js';
import { registerEvent } from './calendario/registerEvent.js';
import { validateDate } from './calendario/postEvent.js';

const routes = {
    "/": "../pages/home/home.html",
    "/voluntario": "../pages/voluntario/voluntario.html",
    "/empresa": "../pages/empresa/empresa.html",
    "/escolas": "../pages/escola/escola.html",
    "/calendario": "../pages/calendario/calendario.html",
    "/video": "../pages/video/videos.html",
    "/registro-calendario": "../pages/registro-calendario/register.html"
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
        createTableSchool(),
        registerSchool(),
        updateSchool()
    }else if(path == '/video'){
        createTableVideos(),
        registerVideo(),
        updateVideo()
    }else if(path == '/voluntario'){
        createTableVoluntary()
    }else if(path == '/empresa'){
        createTableCompany()
    }else if(path ==  '/calendario'){
        createCalendar()
    }else if(path == '/registro-calendario'){
        getSelected()
        validateDate()
        registerEvent()
        createTableEvents()
    }
}
 

window.route = route;