'use strict'

export const searchAdress = function() {

    const getCep = async function(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const response = await fetch(url)
        const data = await response.json()
        return {
            municipio: data.localidade,
            estado: data.uf,
            bairro: data.bairro,
            logradouro: data.logradouro
        }
    }

   const fillFormAdress = async () => {
        const cepEscola = document.getElementById('cep-escola').value;
        const setCep = await getCep(cepEscola)
        document.getElementById('logradouro-escola').value = setCep.logradouro
        document.getElementById('bairro-escola').value = setCep.bairro
        document.getElementById('cidade-escola').value = setCep.municipio
        document.getElementById('estado-escola').value = setCep.estado
    }

    document.getElementById('cep-escola').addEventListener('blur', fillFormAdress)

    const editInputAdress = async () => {
        const cepEscola = document.getElementById('edit-cep-escola').value;
        const setCep = await getCep(cepEscola);
        document.getElementById('edit-logradouro-escola').value = setCep.logradouro
        document.getElementById('edit-bairro-escola').value = setCep.bairro
        document.getElementById('edit-cidade-escola').value = setCep.municipio
        document.getElementById('edit-estado-escola').value = setCep.estado
    }
    
    document.getElementById('edit-cep-escola').addEventListener('blur', editInputAdress)


    

}
