import Backbone from 'backbone'
import $ from 'jquery'
import router from '../router'
import settings from '../settings'
import session from '../models/session'
import contacts from '../collections/contacts'
import _ from 'underscore'

function contactList() {
  let $contactsPage = $(`
    <div id="contacts">
      <main class="contact-list">
      </main>
    </div>
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
      $contactsPage.find('.contact-list').append($contact)
  }
  contacts.on('add', renderContact)
  contacts.forEach(renderContact)
  return $contactsPage
}
export default contactList