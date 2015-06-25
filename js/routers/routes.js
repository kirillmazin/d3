define([
"jquery",
"underscore",
"backbone"], function ($, _,Backbone) {

	var Route = Backbone.Router.extend({
		initialize: function () {
				this.catch_clicks();
			Backbone.history.start()
		
		
		},
		routes: {
				"home" 	   : "home",
				"maps" 	   : "maps",
				"dots" 	   : "dots",
				"chords"   : "chords",
				"hide_all" : "hide_all"
			},
			
			home: function(){
			
			
			},
			
			maps: function () {
			
				
				this.trigger("update",{type:"show_view",view:"maps"});
			},
			dots: function () {
				console.log(" we have dots");
				this.trigger("update",{type:"show_dots",view:"dots"});
			},
			chords: function () {
			
				console.log(" we have chords");
				this.trigger("update",{type:"show_dots",view:"chords"});
			},
			hide_all: function () {
				this.trigger("update",{type:"show_dots",view:"hide_all"});
			},
		handle_updates:function (o) {
				//console.log(" nav updates ");
				//console.log(o);
		},
		
		process_clicks:function (event) {
			
			
			
			var href, passThrough, url;
			href = $(event.currentTarget).attr('href');
			
		
			console.log(href);
			
			
			
			 if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
			   event.preventDefault();
			  
			   url = href.replace(/^\//, '').replace('\#\!\/', '');
			  
			  
			 
			 
			   this.navigate(url, {
			     trigger: true
			   });
			  
			   return false;
			 }
			 
			
			
		},
		catch_clicks:function () {
		
			
			
			$(document).on("click", "a[href^='/']",$.proxy(this.process_clicks, this));			
			
					}
				
	});

return Route;

});

/*	

*/