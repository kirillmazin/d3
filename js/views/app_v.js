define([
"jquery",
"underscore",
"backbone",
"views/info_nav_v",
"views/nav/subnav_v",
"collections/nav_items_c",
"collections/offering_c",
"routers/routes",

"collections/startups_c",
"views/view_manager_v"],
function ($, _, Backbone, Info_nav_v,Subnav_v, Nav_c, Offering_c, Route, Startups_c,  View_manager) {

//,




	var App_v = Backbone.View.extend({



		initialize:function () {



				Number.prototype.formatMoney = function(c){
				var n = this,
    		c = isNaN(c = Math.abs(c)) ? 2 : c,
    		d = d == undefined ? "." : d,
    		t = t == undefined ? "," : t,
    		s = n < 0 ? "-" : "",
    		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    		j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 	};


			this.subnav_v;
			this.startups_c = new Startups_c();

			this.startups_c.test();


			this.view_m = new View_manager({collection:this.startups_c});






			var nav_c = new Nav_c();

			nav_c.url = "js/data/nav.json";

			nav_c.fetch(
				{success: $.proxy(this.build_interface,this)}

			);




			// load startup data




			//this.render();

		},

		build_interface:function (o) {


			var info_nav_v = new Info_nav_v({el:"#nav", collection:o});
			this.subnav_v = new Subnav_v({el:"#subnav", collection: o});


			var route = new Route();

			this.view_m.listenTo(route, "update",this.view_m.update);
			this.subnav_v.listenTo(route, "update", this.subnav_v.update);

		},
		render:function () {


		}

	});

	return App_v;


});
