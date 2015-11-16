var Model = Backbone.Model.extend({
  urlRoot:'http://tiny-starburst.herokuapp.com/collections/todoTaylor',
})

var Collection = Backbone.Collection.extend({
  url:'http://tiny-starburst.herokuapp.com/collections/todoTaylor',
  model: Model,
})

var InputView = Backbone.View.extend({
  template: _.template($('#inputTemplate').html()),
  tagName: 'section',

  events: {
    'click #inputSendBtn' : 'handlePost'
  },
  handlePost: function(event){
      var thingToDo = $('#inputBox').val();
      console.log(thingToDo)
      $('#inputBox').val('');
      this.collection.create({
        'post':thingToDo
      })
      console.log('posted');
    },
  render: function(){
    console.log('input rendered');
    this.$el.html(this.template())
    return this;
  }

})

var ItemView = Backbone.View.extend({
  template: _.template($('#itemTemplate').html()),
  tagName: 'section',
  // collection: this.collection,
  model: this.model,

    events:{
      'click #deleteBtn':'deleteBtn'
    },

    deleteBtn: function(){
      var mods = this.collection.model();
    },

    render: function(){
      console.log('item view render')
      this.$el.html(this.template({
        post: this.model.toJSON()
      }))
      return this;
    }

})

var ListView = Backbone.View.extend({
  template: _.template($('#listTemplate').html()),
  tagName:'section',

  render: function() {
    // for each model in the collection do this:
    console.log('list rendered')

    this.collection.forEach(function(item){
      var itemview = new ItemView({model: item})
      console.log(item)
      itemview.render()
      $('#itemDisplay').html(itemview.el)
      console.log())

    })

    this.$el.html(this.template({
      posts: this.collection.toJSON()
    }))
    return this;
    //render children (for each model in the collection, make a new view that is just the post itself add to this view's el)
  }

})


var Router = Backbone.Router.extend({
  routes:{
    '':'main'
  },
  main: function(){
    var model = new Model();
    var collection = new Collection()
    var inputview = new InputView({
      collection: collection
    })
    var itemview = new ItemView({
      model: model
    })
    var listview = new ListView({
      collection: collection
    })

    collection.fetch({
      success: function(){
        console.log('got collection')
        inputview.render();
        $('.inputDisplay').html(inputview.el);
        listview.render(),
        $('.listDisplay').html(listview.el)
        }
      })
    }
  });

router = new Router()
router

Backbone.history.start()
