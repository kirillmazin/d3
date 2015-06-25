define(['backbone','models/nav_m'], function (Backbone, Nav_m) {
	
	var Offering_c = Backbone.Collection.extend({
		model: Nav_m
	});
	
	return Offering_c;

});