define([
"views/d3_views/d3_utils_v",
"views/d3_views/d3_chord_v",
"text!templates/d3_views/d3_chords.html"],
function(D3_utils_v, D3_chord_v, Tmpl_chords)
{


	var D3_chords = D3_utils_v.extend({
		template:_.template(Tmpl_chords),
		initialize:function () {


			this.render();
			this.chords = [];
			this.all_subviews = [];
			var tech_categories = this.collection.tech_categories

			for(var i=0;i< tech_categories.length;i++){

				var svg_id 					= "chord_" + (i+1)+"_svg";
				var container_id 		= "container_chord_" + (i+1);
				var category 				= this.collection.tech_categories[i];
				var zero_padding   = "0";


				if(i>8){
						zero_padding = "";
				}
				var next  					= zero_padding+(i+1);
				this.all_subviews.push(new D3_chord_v({el:"#all_chords",container_id: container_id, subview_id:":chords_"+next,id:svg_id,collection:this.collection, category:category}));

			}


		},

		render:function () {

			this.$el.html(this.template({}));

		},
		update: function (o) {

				this.hide_subviews();
				if(o.subview){
							this.show_subviews(o);


				}
		}
	});


	return D3_chords;

});
