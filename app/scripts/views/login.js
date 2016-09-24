import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function login(){
  let $login = $(`
    <div class="loginPage">
      <h2 class="display-1">Log In</h2>
        <div class="form-group loginForm">
          <input id="luser" type="text" class="form-control"
            placeholder="username" value=""/>
        </div>
        <div class="form-group loginForm">
          <input id="lpass" type="password" class="form-control"
            placeholder="password" value="">
        </div>
        <input id="loginBtn" type="button" class="btn btn-primary lbtn"
          name="loginBtn" value="Log In">
        <input id="toSignup" type="button" class="btn btn-success-outline lbtn"
          name="toSignup" value="Not a Member Yet? Sign Up">
    </div>
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