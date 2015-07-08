define([
"backbone","views/nav/subnav_content_v"], function (Backbone, Subnav_content_v) {

	var Subnav_v = Backbone.View.extend({

		initialize:function () {
			this.buttons = [];

			this.subnav_ids = ["#subnav_maps","#subnav_dots","#subnav_chords"];
			this.subnavs = [];

			this.render();


		},
		render:function () {



			for(var i=0;i<this.collection.length;i++){

					var m = this.collection.at(i);
					var subnav = m.get("subnav");

					if(subnav.length > 0){
						this.subnavs.push(new Subnav_content_v({el:this.subnav_ids[i],subnav: subnav}));

					}
								this.hide_subnav();

			}

		},
		hide_subnav:function () {
			console.log("hide subnav");
			for(var i=0;i<this.subnav_ids.length;i++){
				//console.log(this.subnav_ids[i]);
				this.$(this.subnav_ids[i]).css("display","none");
			}
		},

		update:function (o) {
			this.hide_subnav();



			if(o.view == "chords"){

				this.$("#subnav_chords").css("display","block");


			}

			if(o.view == "dots"){
				//this.nav_dots.show();
				//	console.log("dots");
					this.$("#subnav_dots").css("display","block");


			}

			if(o.view == "maps"){
				//this.nav_maps.show();
				//	console.log("  maps");
						this.$("#subnav_maps").css("display","block");
			}

		}

	});

	return Subnav_v;


});
