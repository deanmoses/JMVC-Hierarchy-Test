/**
 * @tag controllers, home
 * Displays reports
 */
$.Controller.extend('tree.Controllers.Report',
/* @Static */
{
  onDocument: true
},
/* @Prototype */
{
  /**
   * Listen for the category selection event and change the reports displayed.
   * @param params
   */
'category_select subscribe' : function(params) {
  //console.log('in report controllers category select subscribe');
    tree.Models.Report.findAll({}, this.callback('list'));
},
 /**
 * Display list of reports
 * @param {Array} reports An array of tree.Models.Report objects.
 */
 list: function( reports ){
	$('#reportlist').html(this.view('list', {reports:reports} ));
 },
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The report's edit link element.
 */
'.edit click': function( el ){
	var report = el.closest('.report').model();
	report.elements().html(this.view('edit', report));
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The report's cancel link element.
 */
'.cancel click': function( el ){
	this.show(el.closest('.report').model());
},
 /**
 * Updates the report from the edit values.
 */
'.update click': function( el ){
	var report = el.closest('.report');
	$report.model().update(report.formParams());
},
 /**
 * Listens for updated reports.	 When a report is updated,
 * update's its display.
 */
'report.updated subscribe': function( called, report ){
	this.show(report);
},
 /**
 * Shows a report's information.
 */
show: function( report ){
	report.elements().html(this.view('show',report));
},
 /**
 *	 Handle's clicking on a report's destroy link.
 */
'.destroy click': function( el ){
	if(confirm("Are you sure you want to destroy?")){
		el.closest('.report').model().destroy();
	}
 },
 /**
 *	 Listens for reports being destroyed and removes them from being displayed.
 */
"report.destroyed subscribe": function(called, report){
	report.elements().remove();	 //removes ALL elements
 }
});