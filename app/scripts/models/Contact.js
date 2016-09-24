import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'

export default Backbone.Model.extend({
  idAttribute: '_id',
  url: `http://baas.kinvey.com/appdata/${settings.appKey}/contacts`,
  defaults: {
    name: '',
    nickname: '',
    phone: '',
    email: ''
  }
})