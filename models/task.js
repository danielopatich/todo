var App.Models.Task = Backbone.Model.extend({
  urlRoot    : 'https://tiny-starburst.herokuapp.com/collections/danielTODO',
  idAttribute: '_id',
  defaults   : {
    task: task
  }
});
