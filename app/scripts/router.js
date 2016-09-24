import Backbone from 'backbone'
import $ from 'jquery'

import login from './views/login'
import signup from './views/signup'
import app from './views/app'
import header from './views/header'
import contactList from './views/contactList'
import addNewContact from './views/addNewContact'


import session from './models/session'

const Router = Backbone.Router.extend({
  routes: {
    login     : 'showLogin',
    signup    : 'showSignup',
    app       : 'showApp',
    'app/new' : 'showAddNewForm',
    '/*'      : 'showLogin'
  },
  // login — if you already have an authtoken, route to app, otherwise append login view
  showLogin() {
    console.log( 'login route' )
    $('.container').empty().append(login)
  },

  showSignup() {
    console.log( 'signup route' )
    $('.container').empty().append(signup)
  },

  showApp() {
    console.log( 'app route' )
    console.log( 'session app route:', session )

    $('.container').empty().append(header)
    .append(addNewContact)
      .append(contactList)
  },

  showAddNewForm(){
    $('.container').empty().append(header)
     .append(addNewContact)
  }

})
let router = new Router()
export default router
