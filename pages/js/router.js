'use strict'

console.log("teste");

const routes = {
    "/": "/",
    "/voluntario": "../voluntario/voluntario.html",
    "/empresa":"../empresa/empresa.html",
    "/calendario":"../calendario/calendario.html",
    "/video":"../video/videos.html"
};
  
const route = () => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)
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

