define([
"backbone"], function (Backbone) {
	
	var Subnav_v = Backbone.View.extend({
		
		initialize:function () {
			this.buttons = [];
		
			console.log(" +++++ Build a subnav ");
			//this.build_nav();
			this.render();
			
			
		},
		render:function () {
			this.$el.html("<div>Subnav goes here</div>");
		},
		hide_subnav:function () {
			console.log("hide subnav");
		},
		
		update:function (o) {
			this.hide_subnav();
			if(o.nav_view == "chords"){
				//this.nav_chords.show();
			}
			
			if(o.view == "dots"){
				//this.nav_dots.show();
			}
			
			if(o.view == "maps"){
				//this.nav_maps.show();
			}
		
		}
		
	});
	
	return Subnav_v;
	

});