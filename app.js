var App = {};
App.Models = {};
App.Views = {};
App.Collections = {};

// App.Router = Backbone.Router.extend({
//   routes: {
//     '':'',
//     '':''
//   },
//
//   blank: function() {
//
//
//   },
//
//   blank: function() {
//
//
//   },
// });
//
// function build(){
//   var view = new View({
//     collection: collection
//   });
//   collection.fetch().then(function(){
//     $('.').html(view.render().el)
//   }.bind(this));
// }


$('document').ready(function(){
  App.router = new App.Router();
  Backbone.history.start();
})
