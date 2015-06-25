define(['backbone'], function (Backbone) {
	
	var Nav_m = Backbone.Model.extend({
		defaults:{
			"header":"public offering",
			"id":"id_01"
		}	
	});
	
	return Nav_m;

});