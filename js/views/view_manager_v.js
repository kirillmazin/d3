define([
"jquery",
"underscore",
"backbone",
"views/d3_views/d3_maps_v",
"views/d3_views/d3_dots_v",
"views/d3_views/d3_chords_v"
],
function ($, _, Backbone, D3_maps, D3_dots, D3_chords)

{

	var View_manager = Backbone.View.extend({
		initialize:function () {

			this.chords;
			this.dots;
			this.maps;

			//this.chords_subnav;
			//this.dots_subnav;
			//this.maps_subnav;

			this.all_views = [];
			this.listenTo(this.collection,"startups_loaded", this.render);


		},
		render:function () {

			// generate the views
			this.maps   = new D3_maps({el:"#view_maps",collection:this.collection});
			this.dots   = new D3_dots({el:"#view_dots",collection:this.collection});
			this.chords = new D3_chords({el:"#view_chords",collection:this.collection});




			this.all_views.push(this.maps, this.dots, this.chords);

			this.hide_all_views();

		},

		hide_all_views:function () {

			for(var i=0;i<this.all_views.length;i++){

				this.all_views[i].hide();
			}
		},

		update:function (o) {

			this.hide_all_views();
			if(o.view == "chords"){
				this.chords.show();
				this.chords.update(o);
			}

			if(o.view == "dots"){
				console.log("UPDATE dots " + o);
				console.log(o);
				this.dots.show();
				this.dots.update(o);
			}

			if(o.view == "maps"){
				console.log("UPDATE  maps " + o);
				console.log(o);

				this.maps.show();
				this.maps.update(o);
			}



		}




	});

	return View_manager;
});
