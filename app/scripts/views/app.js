import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function app() {
  let $app = $(`
    <div class="app">
      <header class="container-fluid">
        <input id="addNewBtn" 
          class="addNewBtn" 
          type="button" 
          value="Add New" />
        <h1>Contact List</h1> 
        <input id="logoutBtn" 
          class="logoutBtn" 
          type="button" 
          value="Log Out"/> 
      </header>
      <main class="contactList">
        <li class="contact" id="contact">
          <p class="detail" id="name">Name</p>
          <p class="detail" id="nickname">Nickname</p>
          <p class="detail" id="phone">Phone</p>
          <p class="detail" id="email">Email</p>
        </li>
      </main>
    </div>
    `)

  let logout = $app.find('#logoutBtn')
  logout.on('click', function (e) {
    console.log( 'log out', e );
     $.ajax({
       type: 'POST',
       url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`,
       contentType: 'application/json',
       success: function(response) {
         sessionStorage.removeItem('session')
         delete session.authtoken
         router.navigate('login', {trigger:true})
         console.log('SUCCESS! You logged out', session, sessionStorage)
       }
     })
  })
 
  let addNewBtn = $app.find('#addNewBtn')
  addNewBtn.on('click', (e) => {
    console.log( e )
  })



  return $app
}
export default app