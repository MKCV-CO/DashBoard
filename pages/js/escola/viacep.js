'use strict'

export const cep = function() {

    import { searchAdress } from "./request.js"

    const fillFormAdress = async() => {
        const cepEscola = document.getElementById('cep-escola').value;
        const setCep = await searchAdress(cepEscola)
        document.getElementById('logradouro').value = setCep.logradouro
        document.getElementById('bairro').value = setCep.bairro
        document.getElementById('cidade').value = setCep.municipio
        document.getElementById('estado').value = setCep.estado
    }

    document.getElementById('cep-escola').addEventListener('blur', fillFormAdress)

}