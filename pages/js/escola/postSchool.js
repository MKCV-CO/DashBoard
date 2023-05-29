const isValidFields = () => document.getElementById('form-register').reportValidity()

const getValuesForm = () => {
    if (isValidFields()) {
        const newSchool = {
            escola: {
                nome: document.getElementById('nome-escola').value,
                cnpj:  document.getElementById('cnpj-escola').value,
                telefone: document.getElementById('telefone-escola').value,
                email: document.getElementById('email-escola').value,
                responsavel: document.getElementById('responsavel-escola').value,
            },
            endereco: {
                cep: document.getElementById('cep-escola').value,
                complemento: "null",
                numero: document.getElementById('numero-escola').value,
                logradouro:  document.getElementById('logradouro-escola').value,
                bairro:  document.getElementById('bairro-escola').value,
                cidade:  document.getElementById('cidade-escola').value,
                estado: document.getElementById('estado-escola').value
            }
        }
        return newSchool
    }
    else{
        return false
    }
    
}

const clearFields = () => {
    const fields = document.querySelectorAll('.text-input')
    fields.forEach(field => {
        field.value = ""
    })
}



export const postSchool = async () => {
    const dataBody = getValuesForm()
    

    const initPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    console.log(initPost.body);

    const url = 'http://localhost:8080/v1/cultural-path/escola';
    const respose = await fetch(url, initPost); 
    const school = await respose.json()
    alert('Escola adicionada no sistema!');
    clearFields()
    return school;
}
