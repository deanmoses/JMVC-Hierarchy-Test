//steal/js tree/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('tree/scripts/build.html',{to: 'tree'});
});
