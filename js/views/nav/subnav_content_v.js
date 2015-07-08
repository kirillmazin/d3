define([
"backbone",
"views/nav/button_v",
"models/nav_m"], function (Backbone,Button_v, Nav_m) {

	var Subnav_content_v = Backbone.View.extend({

		initialize:function (o) {
			this.buttons = [];
			this.subnav = o.subnav;
			this.models = [];
			// ßconsole.log(" +++++ Build a subnav content");

			this.render();


		},
		render:function () {

			for(var l=0;l<this.subnav.length;l++){

				var o = this.subnav[l];
			//	console.log(o.header);
				var m = new Nav_m(o);
				this.models.push(m);
				this.buttons.push(new Button_v({el:this.el, model:m}));




			}


		},

	});

	return Subnav_content_v;


});
