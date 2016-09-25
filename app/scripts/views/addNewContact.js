import $ from 'jquery'
import Backbone from 'backbone'
import session from '../models/session'
import settings from '../settings'
import router from '../router'
import contacts from '../collections/contacts'

function addContact() {
  let $addContact = $(`
    <div class="addContact">
      <form class="addContactForm">
        <div class="form-group newContact">
          <input id="name" type="text" class="form-control addNew" placeholder="Name" />
        </div>
        <div class="form-group newContact">
          <input id="nick" type="text" class="form-control addNew" placeholder="Nickname" />
        </div>
       <div class="form-group newContact">
          <input id="phone" type="text" class="form-control addNew" placeholder="Phone" />
        </div>
        <div class="form-group newContact">
          <input id="email" type="text" class="form-control addNew" placeholder="Email" />
        </div>
      </form>
      <div class="formButtons">      
          <input id="addNewContactBtn" type="button" class="btn addNew" value="Add Contact" />
          <input id="clear" type="button" class="btn addNew" value="Clear" />
        </div>
    </div>
    
  `)
  console.log( contacts.fetch(), 'contacts:', contacts )

  let clear = $addContact.find('#clear')
  let addNewContactBtn = $addContact.find('#addNewContactBtn')

  let name = $addContact.find('#name')
  let nick = $addContact.find('#nick')
  let phone = $addContact.find('#phone')
  let email = $addContact.find('#email')

  function clearFields() {
    name.val('')
    nick.val('')
    phone.val('')
    email.val('')
    console.log('contacts:', contacts )
  }

  clear.on('click', clearFields)

  addNewContactBtn.on('click', (e) => {
    let newContactName = name.val()
    let newContactNick = nick.val()
    let newContactPhone = phone.val()
    let newContactEmail = email.val()

    contacts.create({
      name: newContactName,
      nickname: newContactNick,
      phone: newContactPhone,
      email: newContactEmail
    }, {
      success: function(response) {
        console.log( 'SUCCESS! You created a new contact', response )
        console.log('contacts:', contacts )
        clearFields()
      },
      error: function(response) {
        console.log( 'ERROR: You did NOT create a new contact', response );
      }
    })

    // $.ajax({
    //   type: 'POST',
    //   url: `https://baas.kinvey.com/appdata/${settings.appKey}/contacts`,
    //   contentType: 'application/json',
    //   data: JSON.stringify({
    //     name: newContactName,
    //     nickname: newContactNick,
    //     phone: newContactPhone,
    //     email: newContactEmail
    //   })
    // })
  })
    return $addContact
}
export default addContact
