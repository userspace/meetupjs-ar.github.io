

const initialize = () => {
    const loginElement = document.querySelector('a.bg-userspace-login')
    loginElement.href = `https://gateway.user.space/sign/${applicationId()}`

    //1. update user token identification
    const token = (window.location.search.match(/[\?&]token=([a-zA-Z0-9\.-\_]+)[#&]?/) || []).pop() || localStorage.id_token
    let payload

    try {
        if (!token) throw Error('no token')
        payload = JSON.parse(atob(token.split('.')[1].replace('_','/').replace('-','+')))
        if (payload.exp < Math.round(Date.now() / 1000)) throw Error('token expired')
    } catch (ex) {
        //eslint-disable-next-line no-console
        console.warn(ex)
        delete localStorage.id_token
        return
    }

    localStorage.id_token = token

    //2. update login button
    loginElement.querySelector('span').textContent = 'Change user'

    //eslint-disable-next-line no-undef
    mixpanel.track('login',{ user: payload.sub })
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

const tracked_reminder = (...args) => reminder(args)
//eslint-disable-next-line no-undef
    .then(() => mixpanel.track('reminder',{args}))

module.exports = {
    initialize,
    login,
    applicationId,
    reminder: tracked_reminder,
}
