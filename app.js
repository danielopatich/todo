// MODEL //
var Task = Backbone.Model.extend({
  urlRoot: 'https://tiny-starburst.herokuapp.com/collections/danielTODO',
  idAttribute: '_id',
});
// END MODEL //


// COLLECTION //
var TaskList = Backbone.Collection.extend({
  url: 'https://tiny-starburst.herokuapp.com/collections/danielTODO',
  Model: Task,
});
// END COLLECTION //


// FIRST VIEW //
var TaskBox = Backbone.View.extend({
  template: _.template($('#inputTemplate').html()),

  events: {
    'keypress .makeTask' : 'makeTaskEnter',
  },

  send: function() {
    var makeTask = this.$('.makeTask').val();
    var taskInput = new Task({
      'task': task,
    });
    taskInput.save(null, {
      success: function() {
      }
    });
    taskInput.save();
  },

  makeTaskEnter: function(event) {
    if (event.keyCode === 13) {
      var task = $('.makeTask').val();
      $('.makeTask').val('');
      this.collection.create({
        todo: {
          task: task
        }
      });
      console.log(this.collection);
    }
  },

  render: function() {
    var inputTemplate = $('#inputTemplate').html();
    this.$el.html(inputTemplate);
    return this;
  }
});
// END FIRST VIEW //


// SECOND VIEW //
var TaskListItemView = Backbone.View.extend({
  template : _.template($('#listTemplate').html()),

  events: {
    'click #makeTaskDlt'    : 'makeTaskDelete'
  },

  initialize: function() {
    this.listenTo(this.collection, 'fetch sync', this.render);
    this.listenTo(this.collection, 'destroy', this.remove);
  },

  render: function() {
    var display = this;
    this.$el.html('');
    this.collection.each(function(model){
      var taskBox = new TaskBox({
        task: task
        });
        taskBox.render();
        display.$el.append(taskBox.el);
      });
    }
  },

  makeTaskDelete: function(task) {
    this.collection.destroy(task);
  },
});
// END SECOND VIEW //


var taskStuff = new TaskListItemView();
var TaskList = new Tasks();
taskStuff.render();
$('main').append(taskStuff.el);
