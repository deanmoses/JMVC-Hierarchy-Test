/**
 * @tag models, home
 * Wraps backend report services.  Enables
 * [tree.Models.Report.static.findAll retrieving],
 * [tree.Models.Report.static.update updating],
 * [tree.Models.Report.static.destroy destroying], and
 * [tree.Models.Report.static.create creating] reports.
 */
$.Model.extend('tree.Models.Report',
/* @Static */
{
  /**
   * Get the reports in the specified category.
   *
   * @param params {Object} params should contain a 'categoryId' property
   * @param {Function} success a callback function that returns wrapped report objects.
   * @param {Function} error a callback function for an error in the ajax request.
   */
  getByCategory: function( params, success, error ) {
    // Todo: implement getByCategory().  I need a way of getting at the previously retrieved models
  },
	/**
 	 * Retrieves reports from  backend service.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped recipe objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/report',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error,
			fixture: "//tree/fixtures/reports.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Update a report
	 * @param {String} id A unique id representing your recipe.
	 * @param {Object} attrs Data to update your recipe with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/report/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a report's data.
 	 * @param {String} id A unique id representing your recipe.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/report/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture: "-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
	/**
	 * Creates a report.
	 * @param {Object} attrs A recipe's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/reports',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: "-restCreate" //uses $.fixture.restCreate for response.
		});
	}
},
/* @Prototype */
{});