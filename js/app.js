const getLogin = () => {
    const buttonSubmit = document.getElementById('submit')
    const userBox = document.getElementById('user-box')
    const passwordBox = document.getElementById('password-box')
    const invalidateError = document.createElement('div')
    const userEmptyError = document.createElement('span')
    const passwordEmptyError = document.createElement('span')
    const wrongUserPassword = document.createElement('span')
    
    buttonSubmit.addEventListener('click', () => {
        const user = document.getElementById('user').value
        const password = document.getElementById('password').value
        
        if (user == "admin" && password == "admin_cultural_path") {
            buttonSubmit.href = '/pages/home.html'
        }else if(user == ""){
            userEmptyError.textContent = 'Usuário não pode estar vazio'
            userEmptyError.classList.add('empty-error')
            invalidateError.replaceChildren(userEmptyError)
            userBox.appendChild(invalidateError)
        }else if(password == ""){
            passwordEmptyError.textContent = 'Senha não pode estar vazia'
            passwordEmptyError.classList.add('empty-error')
            invalidateError.replaceChildren(passwordEmptyError)
            passwordBox.appendChild(invalidateError)
        }else if(user != 'admin' && password != 'admin_cultural_path'){
            wrongUserPassword.textContent = 'Usuário e Senha não coicidem'
            wrongUserPassword.classList.add('empty-error')
            invalidateError.replaceChildren(wrongUserPassword)
            passwordBox.appendChild(invalidateError)
        }
    })
}

getLogin()