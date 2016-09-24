import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'
import session from '../models/session'
import router from '../router'

function header() {
  let $header = $(`
  <header>
    <h1>Contact List</h1> 
    <input id="logoutBtn" 
      class="logoutBtn" 
      type="button" 
      value="Log Out" /> 
  </header>
  `)
  let logout = $header.find('#logoutBtn')
    logout.on('click', (e) => {
      $.ajax({
        type: 'POST',
        url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`,
        contentType: 'application/json',
        success: (response) => {
          sessionStorage.removeItem('session')
          delete session.authtoken
          router.navigate('login', {trigger:true})
          console.log('SUCCESS! You logged out', 
            session, sessionStorage)
         }
       })
    })

  let addNewBtn = $header.find('#addNewBtn')

  addNewBtn.on('click', (e) => {
    console.log( e )
    router.navigate('app/new', {trigger:true})
  })

  return $header
}
export default header