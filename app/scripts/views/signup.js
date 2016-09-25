import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function signup(){
  let $signup = $(`
    <main class="signup">
      <div class="form">
        <h2>Create a New Account</h2>
        <form>
          <input id="new-user" name="username" placeholder="Username" type="text">
          <input id="pw1" name="password" placeholder="Password" type="password">
          <input id="pw2" name="password" placeholder="Confirm Password" type="password">
          <button id="signupBtn" class="btn"> Sign Up </button>
        </form>
        <p>Already a member? </p>
        <p id="toLogin" class="toLogin">
          Log In</p>
      </div>
    </main>
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