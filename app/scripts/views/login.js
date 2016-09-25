import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function login(){
  let $login = $(`
    <main class="login">
      <div class="form">
        <h2>Login To Your Account</h2>
        <form>
          <input id="luser" name="username" placeholder="Username" type="text">
          <input id="lpass" name="password" placeholder="Password" type="password">
          <button id="loginBtn" class="btn"> Login </button>
        </form>
        <p>Not a memeber yet? <span id="toSignup" class="toSignup">
          Sign Up</span></p>
      </div>
    </main>
  `)  

  // route toSignup to signup
  let toSignup = $login.find('#toSignup')
  let loginBtn = $login.find('#loginBtn')

  toSignup.on('click', function(e) {
    e.preventDefault()
    console.log( e );
    router.navigate('signup', {trigger:true})
  })

  loginBtn.on('click', function(e) {
    e.preventDefault()
    console.log( e );
    let username = $('#luser').val()
    let password = $('#lpass').val()
    let basic = settings.basicAuth
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/user/${settings.appKey}/login`,
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      success: function(response) {
        session.username = username
        session.authtoken = response._kmd.authtoken
        session.userId =  response._id
        sessionStorage.session = JSON.stringify(session)
        // console.log( sessionStorage )
        // console.log( 'session success:', session )
        // console.log( 'SUCCESS! Response:', response )
        // console.log( 'username:', response.username )
        // console.log( 'authtoken:', response._kmd.authtoken )
        router.navigate('app', {trigger: true})
      },
      error: function(response) {
        console.log( 'ERROR: ', response )
      }
    })
  })

  return $login
}
export default login