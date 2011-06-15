/**
 * @tag controllers, home
 *
 * The global history controller.  Listens for changes to the browser URL's hash fragment (#thispart)
 * and sends messages to other controllers.
 *
 * @see http://forum.javascriptmvc.com/topic/v3-0-history-plugin-documentation
 */
$.Controller.extend('tree.Controllers.History',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
  /**
   * Subscribe to all URI hash fragment changes and dish out
   *
   * @param called A string of this format:
   *   - no hash:  "history.index"
   *   - #category/10:  "history.category.10"
   *   - #category&id=10 "history.category.index"
   *
   * @param params
   */
  "history.category.* subscribe" : function(called, params){
    var controllerParts = called.split('.');
    controllerParts.shift(); // Get rid of the "history" element
    var controllerName = controllerParts[0];
    if (controllerName == 'category') {
      var categoryId = controllerParts[1];
      this.publish("category_select", {category:categoryId});
    }
    else {
      console.log('Unhandled URL hash change: ' + called);
    }
  },

  "history.index subscribe" : function(called, params) {
    // TODO: figure out first category ID in list
    var categoryId = 0;
    this.publish("category_select", {category:categoryId});
  }
});