import Backbone from 'backbone'
import $ from 'jquery'

import login from './views/login'
import signup from './views/signup'
import app from './views/app'
import header from './views/header'
import contactList from './views/contactList'
import addNewContact from './views/addNewContact'
import contacts from './collections/contacts'



import session from './models/session'

const Router = Backbone.Router.extend({
  routes: {
    login     : 'showLogin',
    signup    : 'showSignup',
    app       : 'showContactList',
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

  showContactList: function(){
  // let header = header()
  // let conactList = contactList()
  $('.container').empty().append(header())
    .append(addNewContact)
    contacts.fetch({
      success: function() {
        let $contactList = contactList()
        $('.container').append($contactList)
      },
      error: function() {
        console.log('ERROR!');
      }
    })
},

  showAddNewForm(){
    $('.container').empty().append(header)
     .append(addNewContact)
  }

})
let router = new Router()
export default router
