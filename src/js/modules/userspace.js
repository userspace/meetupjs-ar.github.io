

const initialize = () => {
    //1. update user token identification
    const token = (window.location.search.match(/[\?&]token=([a-zA-Z0-9\.-_]+)[#&]?/) || []).pop()
    if (!token) {
        delete localStorage.id_token
    } else {
        localStorage.id_token = token
    }
    const isLoggedIn = !!localStorage.id_token

    //2. update login button
    const loginElement = document.querySelector('a.bg-userspace-login')
    loginElement.href = `https://gateway.user.space/sign/${applicationId()}`
    if (isLoggedIn) {
        loginElement.querySelector('span').textContent = 'Change user'
    }

}

const login = () => {
    window.location = `https://gateway.user.space/sign/${applicationId()}`
}

const applicationId = () => btoa(window.location.origin + window.location.pathname)

const reminder = (name, place, time, description, delay) => fetch('https://gateway.user.space/remind/me',{
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
        _Bearer: localStorage.id_token,
        event: { place, time, name, description },
        delay
    })
})


module.exports = {
    initialize,
    login,
    applicationId,
    reminder,
}
