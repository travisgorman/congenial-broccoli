import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'
import Contact from '../models/Contact'


const Contacts = Backbone.Collection.extend({
  url: `http://baas.kinvey.com/appdata/${settings.appKey}/contacts`,
  model: Contact
})
let contacts = new Contacts()
export default contacts