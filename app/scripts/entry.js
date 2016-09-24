import Backbone from 'backbone'
import $ from 'jquery'
import settings from './settings'
import router from './router'
import session from './models/session'

// jqXHR.setRequestHeader to kinvey or basic depending on whether or not there is an authtoken in sessionStorage
$(document).ajaxSend(function(e, jqXHR, jqueryAjax){
  
  console.log( 'intercepted' )
  
  if (session.authtoken) {
    jqXHR.setRequestHeader('Authorization', 'Kinvey '+ session.authtoken)
  } else {
    jqXHR.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth)
  }
  
})
// if there's a `session` object in sessionStorage. parse the username and authtoken properties and set to `session` model
if (sessionStorage.session){
  session.username = JSON.parse(sessionStorage.session).username
  session.authtoken = JSON.parse(sessionStorage.session).authtoken
}

Backbone.history.start()

if (!session.username) {
  router.navigate('login', {trigger: true})
}
if (JSON.parse(sessionStorage.session).authtoken) {
  router.navigate('app', {trigger: true})
}
// if there is no username stored in session model, route to `login`

  // console.log( 'settings:', settings )
  // console.log( 'sessionStorage:', window.sessionStorage )
  // console.log( 'session:', session )