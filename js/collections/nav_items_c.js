define(['backbone','models/nav_m'], function (Backbone, Nav_m) {
	
	

	var Nav_c = Backbone.Collection.extend({
		model: Nav_m
	});
	
	return Nav_c;

});