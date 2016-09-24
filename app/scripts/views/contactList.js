import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'

function contactList() {
  let $contactList = $(`
    <main class="contactList" id="contactList"></main>
  `)  
  function renderContact(contact) {
    let $contact = $(`
      <li class="contact" id="contact">
        <p class="detail" id="name">${contact.get('name')}</p>
        <p class="detail" id="nickname">${contact.get('nickname')}</p>
        <p class="detail" id="phone">${contact.get('phone')}</p>
        <p class="detail" id="email">${contact.get('email')}</p>
      </li>
    `)
    $contactList.find('#contactList').append($contact)
  }
  contacts.forEach(renderContact)
}
export default contactList
