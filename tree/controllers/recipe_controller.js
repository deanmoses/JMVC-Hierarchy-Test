/**
 * @tag controllers, home
 * Displays a table of recipes.	 Lets the user 
 * ["tree.Controllers.Recipe.prototype.form submit" create], 
 * ["tree.Controllers.Recipe.prototype.&#46;edit click" edit],
 * or ["tree.Controllers.Recipe.prototype.&#46;destroy click" destroy] recipes.
 */
$.Controller.extend('tree.Controllers.Recipe',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all recipes to be displayed.
 */
 "{window} load": function() {
    
   tree.Models.Recipe.findAll({}, this.callback('list'));

   // create a list of tasks
   $('#recipe2').list({model: tree.Models.Recipe, template: "//tree/views/list/items"});
 },
 /**
 * Displays a list of recipes and the submit form.
 * @param {Array} recipes An array of tree.Models.Recipe objects.
 */
 list: function( recipes ){
	$('#recipe').html(this.view('init', {recipes:recipes} ));
 },
 /**
 * Responds to the create form being submitted by creating a new tree.Models.Recipe.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	new tree.Models.Recipe(el.formParams()).save();
},
/**
 * Listens for recipes being created.	 When a recipe is created, displays the new recipe.
 * @param {String} called The open ajax event that was called.
 * @param {Event} recipe The new recipe.
 */
'recipe.created subscribe': function( called, recipe ){
	$("#recipe>ul").append( this.view("list", {recipes:[recipe]}) );
	$("#recipe form input[type!=submit]").val(""); //clear old vals
},
 /**
 * Handles the click to show the category's reports.
 * @param {jQuery} el The recipe's 'reports' link element.
 */
'.reports click': function( el ){
   //var recipe = el.closest('.recipe').model();
   //location.hash = "category/" + recipe.id;
   //this.publish("category_select", {category:recipe.id});
},
'category_select subscribe' : function(params) {
  //console.log('in recipe controllers category select subscribe');
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The recipe's edit link element.
 */
'.edit click': function( el ){
	var recipe = el.closest('.recipe').model();
	recipe.elements().html(this.view('edit', recipe));
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The recipe's cancel link element.
 */
'.cancel click': function( el ){
	this.show(el.closest('.recipe').model());
},
 /**
 * Updates the recipe from the edit values.
 */
'.update click': function( el ){
	var $recipe = el.closest('.recipe'); 
	$recipe.model().update($recipe.formParams());
},
 /**
 * Listens for updated recipes.	 When a recipe is updated, 
 * updates its display.
 */
'recipe.updated subscribe': function( called, recipe ){
	this.show(recipe);
},
 /**
 * Shows a recipe's information.
 */
show: function( recipe ){
	recipe.elements().html(this.view('show',recipe));
},
 /**
 *	 Handle's clicking on a recipe's destroy link.
 */
'.destroy click': function( el ){
	if(confirm("Are you sure you want to destroy?")){
		el.closest('.recipe').model().destroy();
	}
 },
 /**
 *	 Listens for recipes being destroyed and removes them from being displayed.
 */
"recipe.destroyed subscribe": function(called, recipe){
	recipe.elements().remove();	 //removes ALL elements
 }
});