import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function signup(){
  let $signup = $(`
  <div class="signupPage">
      <h2 class="display-1">Sign Up</h2>
        <div class="form-group signupForm">
          <input id="new-user" type="text" class="form-control"
            placeholder="username" />
        </div>
        <div class="form-group signupForm">
          <input id="pw1" type="password" class="form-control"
            placeholder="password" />
        </div>
        <div class="form-group signupForm">
          <input id="pw2" type="password" class="form-control"
            placeholder="confirm password" />
        </div>
        <input id="signupBtn" type="button" class="btn btn-primary lbtn"
          name="signupBtn" value="Sign Up" />
        <input id="toLogin" type="button" class="btn btn-success-outline lbtn"
          name="toLogin" value="Already a Member? Log in" />
    </div>
  `)

  let toLogin = $signup.find('#toLogin')
  toLogin.on('click', function (e){
    console.log( e )
    router.navigate('login', {trigger:true})
  })

  let signupBtn = $signup.find('#signupBtn')

  signupBtn.on('click', function (e) {
    e.preventDefault()
    let username = $signup.find('#new-user').val()
    let pw1 = $signup.find('#pw1').val()
    let pw2 = $signup.find('#pw2').val()
    if (pw1 !== pw2) {
      alert("Passwords don't match. Try again")
    } else {
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/user/${settings.appKey}`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: username,
          password: pw1
        }),
        success: function(response) {
          console.log( 'SUCCESS: you created a new user', response )

          session.username = username
          session.authtoken = response._kmd.authtoken
          sessionStorage.session = JSON.stringify(session)
          router.navigate('app', {trigger: true})

          console.log( session )
        },
        error: function(response) {
          console.log('ERROR! you did NOT create a new user', response )
          console.log('ERROR:', session )
        }
      })
    }
  })
  return $signup
}

export default signup