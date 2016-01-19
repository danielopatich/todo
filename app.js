// // MODEL //
var Task = Backbone.Model.extend({
    url: 'http://tiny-starburst.herokuapp.com/collections/user'
});

var ToDo = Backbone.Model.extend({
  urlRoot: 'http://tiny-starburst.herokuapp.com/collections/user',
  idAttribute: '_id'
});
// // END MODEL //

// // COLLECTION //
var ToDos = Backbone.Collection.extend({
  model: ToDo,
  url: 'http://tiny-starburst.herokuapp.com/collections/user',
});
// // END COLLECTION //
// FIRST VIEW //
var TaskView = Backbone.View.extend({
  template: _.template($('#TaskTemplate').html()),
  events: {
    'keypress .task' : 'handleEnter'
  },

  send: function() {
    var content = $('.task').val();
    var todoInput = new ToDo({
      content: content,
    });
    todoInput.save();
    this.collection.add(todoInput, {
      at: [0]
    });
  },

  handleEnter: function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.send();
    }
  },

  render: function() {
    var TaskTemplate = $('#TaskTemplate').html();
    this.$el.html(TaskTemplate);
    return this;
  }
});
// END FIRST VIEW //

// SECOND VIEW //
var TaskItem = Backbone.View.extend({
  tagName: 'section',
  className: 'list',
  template: _.template($('#TaskPlacementTemplate').html()),

  events: {
    'click .del': 'handleDelete'
  },

  handleDelete: function(){
    var del = this.$('.del');
    // alert('This todo has been deleted.');
    event.preventDefault();
    this.model.destroy();
  },

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  }
});
// END SECOND VIEW //

// THIRD VIEW //
var TaskList = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'fetch sync', this.render);
    this.listenTo(this.collection, 'destroy', this.remove);
  },

  render: function(){
    var view = this;
    this.$el.html('');
    this.collection.each(function(model){
      var taskItem = new TaskItem({
        model: model
      });
    taskItem.render();
      view.$el.append(taskItem.el);
    });
  }
});
// END THIRD VIEW //

// ROUTER //
  var Router = Backbone.Router.extend({
    routes: {
      '': 'homeRoute'
    },

    homeRoute: function(){
      // var home    = new home();
      var toDos  = new ToDos();
      var todoList = new TaskList({
        collection: toDos
      });
      var Task = new TaskView({
        collection: toDos
      });
      Task.render();
      $('main').append(Task.el);
      toDos.fetch({
        success: function(){
        $('main').append(todoList.el);
        }
      });
    }
  });
// END ROUTER //

var router = new Router();
Backbone.history.start();
