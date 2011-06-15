/**
 * Controls a generic list -- you have to supply the model that provides the list's data, as well as the template.
 *
 * Instantiate this controller like this:
 * $('#tasks').list({model: Task, template: "tasks.ejs"});
 */
$.Controller("List", {
  defaults : {
    template: "items.ejs",
    model: null
  }
},{
  init : function(){
    this.options.model.findAll({}, this.callback('list'));
  },
      /**
      * Displays a list of items
      * @param {Array} items an array of model objects
      */
      list: function( items ){
       this.element.html(this.view(this.options.template, {items: items} ));
      },

  "{model} created" : function(Model, ev, newItem){
    this.element.append(this.options.template, [newItem])
  },
  "{model} updated" : function(Model, ev, updatedItem){
    updatedItem.elements(this.element)
      .replaceWith(this.options.template, [updatedItem])
  },
  "{model} destroyed" : function(Model, ev, destroyedItem){
    destroyedItem.elements(this.element)
      .remove()
  }
});