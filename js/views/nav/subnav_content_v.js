define([
"backbone",
"views/nav/button_v"], function (Backbone,Button_v) {

	var Subnav_content_v = Backbone.View.extend({

		initialize:function () {
			this.buttons = [];

			console.log(" +++++ Build a subnav content");

			this.render();


		},
		render:function () {
			this.$el.append("<div>Subnav goes here</div>");
		},

	});

	return Subnav_content_v;


});
