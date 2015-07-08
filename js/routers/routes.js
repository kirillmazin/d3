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
				"maps:page" : "mapsPage",
				"dots" 	   : "dots",
				"dots:page" 	   : "dotsPage",
				"chords"   : "chords",
				"chords:page":"chordsPage",
				"hide_all" : "hide_all"
			},

			home: function(){


			},

			maps: function () {


				this.trigger("update",{type:"show_view",view:"maps"});
			},
			mapsPage: function(section){

				this.trigger("update",{type:"show_view",view:"maps", subview:section});


			},
			dots: function (section) {

				this.trigger("update",{type:"show_dots",view:"dots"});
			},

			dotsPage: function (section) {

				this.trigger("update",{type:"show_dots",view:"dots",subview:section});
			},
			chords: function () {


				this.trigger("update",{type:"show_chords",view:"chords"});
			},
			chordsPage:function(section){
					this.trigger("update",{type:"show_dots",view:"chords",subview:section});
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
