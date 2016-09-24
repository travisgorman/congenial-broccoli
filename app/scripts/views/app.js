import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function app() {
  let $app = $(`
    <header>
      <h1>Contacts</h1>
      <button id="logoutBtn"> Log Out </button>
    </header>
    `)
  console.log( `welcome ${session.username}` );
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
 



  return $app
}
export default app