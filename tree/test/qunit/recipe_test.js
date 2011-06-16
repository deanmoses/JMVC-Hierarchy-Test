module("Model: tree.Models.Recipe")

asyncTest("findAll", function(){
	stop(2000);
	tree.Models.Recipe.findAll({}, function(recipes){
		ok(recipes)
        ok(recipes.length)
        ok(recipes[0].name)
        ok(recipes[0].description)
		start()
	});
	
})

asyncTest("create", function(){
	stop(2000);
	new tree.Models.Recipe({name: "dry cleaning", description: "take to street corner"}).save(function(recipe){
		ok(recipe);
        ok(recipe.id);
        equals(recipe.name,"dry cleaning")
        recipe.destroy()
		start();
	})
})
asyncTest("update" , function(){
	stop();
	new tree.Models.Recipe({name: "cook dinner", description: "chicken"}).
            save(function(recipe){
            	equals(recipe.description,"chicken");
        		recipe.update({description: "steak"},function(recipe){
        			equals(recipe.description,"steak");
        			recipe.destroy();
        			start()
        		})
            })

});
asyncTest("destroy", function(){
	stop(2000);
	new tree.Models.Recipe({name: "mow grass", description: "use riding mower"}).
            destroy(function(recipe){
            	ok( true ,"Destroy called" )
            	start();
            })
})