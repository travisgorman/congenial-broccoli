import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'

function signup(){
  let $signup = $(`
  <div class="signupPage">
      <h2 class="display-1">Sign Up</h2>
        <div class="form-group signupForm">
          <input id="luser" type="text" class="form-control"
            placeholder="username" value="">
        </div>
        <div class="form-group signupForm">
          <input id="password" type="password" class="form-control"
            placeholder="password" value="">
        </div>
        <input id="signupBtn" type="button" class="btn btn-primary lbtn"
          name="signupBtn" value="Sign Up">
        <input id="toLogin" type="button" class="btn btn-success-outline lbtn"
          name="toLogin" value="Already a Member? Log in">
    </div>
  `)

  let toLogin = $signup.find('#toLogin')
  toLogin.on('click', function(e){
    console.log( e )
    router.navigate('login', {trigger:true})
  })

  
  return $signup
}

export default signup