define([
"backbone",
"views/nav/button_v"], function (Backbone,Button_v) {

	var Info_nav_v = Backbone.View.extend({

		initialize:function () {
			this.buttons = [];
			this.build_nav();
	


		},
		build_nav:function () {


			for(var i=0;i<this.collection.length;i++){



				var m = this.collection.at(i);

				this.menu_item(m);
			}




		},
		menu_item:function (m) {

			var b = new Button_v({model:m, el:this.el, id: m.id})
			this.buttons.push(b);
			this.listenTo(b,"update",this.nav_update);

		},
		nav_update:function (o) {

			this.trigger("update",o)
		}
	});

	return Info_nav_v;


});
