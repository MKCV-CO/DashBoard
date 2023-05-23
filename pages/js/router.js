'use strict'

const routes = {
    "/": "../pages/index.html",
    "/voluntario": "../pages/voluntario/voluntario.html",
    "/empresa":"../pages/empresa/empresa.html",
    "/calendario":"../pages/calendario/calendario.html",
    "/video":"../pages/video/videos.html"
};
  
const route = () => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)
    console.log(window.event.target);
    handleLocation()
}

const handleLocation = async () => {
    const path = window.location.pathname
    const route = routes[path]
    const response = await fetch(route)
    const html = await response.text()
    document.getElementById('root').innerHTML = html
}

window.onpopstate = handleLocation
window.route = route

handleLocation()

