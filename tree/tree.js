steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
  'jquery/controller/history',	// controllers can listen for URI hash fragment changes
	'jquery/view/ejs',				// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',					// Ajax wrappers
  'ss/model/html5_store', // HTML5 localStorage persistence for models
  'jquery/model/associations', // For the Category hasMany children
	'jquery/dom/fixture',			// simulated Ajax requests
  'steal/less', // LESS CSS syntax
	'jquery/dom/form_params')		// form data helper

  .then(function(){steal.less('css/app')})
	
	.css('tree') // loads styles
	.resources() // 3rd party script's (like jQueryUI), in resources folder
	.models('recipe', 'report')	// loads files in models folder
	.controllers('recipe', 'report', 'list', 'history') // loads files in controllers folder
	.views(); // adds views to be added to build