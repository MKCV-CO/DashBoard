const buttonSubmit = document.getElementById('submit');
const userBox = document.getElementById('user-box');
const passwordBox = document.getElementById('password-box');
const invalidateError = document.createElement('div');
const userEmptyError = document.createElement('span');
const passwordEmptyError = document.createElement('span');
const wrongUserPassword = document.createElement('span');

const getLogin = () => {
    buttonSubmit.addEventListener('click', () => {
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        
        if (user == "admin" && password == "admin_cultural_path") {
            buttonSubmit.href = '/pages/index.html'
        }else if(user == ""){
            userEmptyError.textContent = 'Usuário não pode estar vazio'
            userEmptyError.classList.add('empty-error')
            replacingAll(userEmptyError, invalidateError)
        }else if(password == ""){
            passwordEmptyError.textContent = 'Senha não pode estar vazia'
            passwordEmptyError.classList.add('empty-error')
            replacingAll(passwordEmptyError, invalidateError)
        }else if(user != 'admin' || password != 'admin_cultural_path'){
            wrongUserPassword.textContent = 'Usuário e Senha não coicidem'
            wrongUserPassword.classList.add('empty-error')
            replacingAll(wrongUserPassword, invalidateError)
        }
    })
}


const replacingAll = (input, message) => {
    invalidateError.replaceChildren(input)
    passwordBox.appendChild(message)
}


getLogin()