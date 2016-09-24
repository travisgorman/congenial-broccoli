import Backbone from 'backbone'
import $ from 'jquery'

import login from './views/login'
import signup from './views/signup'
import app from './views/app'

import session from './models/session'

const Router = Backbone.Router.extend({
  routes: {
    login   : 'showLogin',
    signup  : 'showSignup',
    app     : 'showApp',
    '/*'    : 'showLogin'
  },
  // login — if you already have an authtoken, route to app, otherwise append login view
  showLogin: function() {
    console.log( 'login route' )
    $('.container').empty().append(login)
  },

  showSignup: function() {
    console.log( 'signup route' )
    $('.container').empty().append(signup)
  },

  showApp: function() {
    console.log( 'app route' )
    console.log( 'session app route:', session );
    $('.container').empty().append(app)
  }

})
let router = new Router()
export default router

