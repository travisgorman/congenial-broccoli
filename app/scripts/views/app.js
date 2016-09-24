import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function contactList() {
  let $contactList = $(`
    <main class="contactList" id="contactList"> 
    </main>
    `)

  return $contactList
}
export default contactList