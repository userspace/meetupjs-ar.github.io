const enableOffline = require('./modules/offline')
const notification = require('./modules/notification')
const renderMonthlyCalendars = require('./modules/calendar')
const initMenu = require('./modules/menu')
const userspace = require('./modules/userspace')

userspace.initialize()

initMenu()

enableOffline()

function handleError (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    document.querySelector('#loading').classList.add('dn')
    document.querySelector('#error-message').classList.remove('dn')
}


fetch(process.env.CALENDAR_API)
    .then(response => response.json())
    .then(notification)
    .then(renderMonthlyCalendars)
    .catch(handleError)

//eslint-disable-next-line no-undef
mixpanel.track('init app', { url : window.location.href })
