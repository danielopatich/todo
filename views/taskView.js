var App.Views.TaskListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'todo',
  template: _.template($('#listTemplate').html()),

  // initialize: function() {
  //   this.listenTo(this.model, 'destroy', this.remove)
  // },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    return this;
  },

  events: {
    'click .remove': 'onRemove'
  },

  onRemove: function() {
    this.model.destroy();
  }
});
