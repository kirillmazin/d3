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
		/*	["Medical", "Information Technology", "Electronic Systems", "Energy", "Agriculture", "Research Tools", "Advanced Materials", "Transportation", "Energy ", "Environment"]*/
			var tech_categories = this.collection.tech_categories
			
			for(var i=0;i< tech_categories.length;i++){
			
				var svg_id = "chord_" + i +"_svg";
				var category = this.collection.tech_categories[i];
				this.chords.push(new D3_chord_v({el:"#all_chords",id:svg_id,collection:this.collection, category:category}));
			}
			
			//var chord_01 = new D3_chord_v({el:"#all_chords",id:"chord_1_svg",collection:this.collection, category:"Medical"});
			//var chord_02 = new D3_chord_v({el:"#all_chords",id:"chord_2_svg",collection:this.collection, category:"Advanced Materials"});
			//var chord_03 = new D3_chord_v({el:"#all_chords",id:"chord_3_svg",collection:this.collection, category:"Electronic Systems"});
			//var chord_02 = new D3_chord_v({el:"#all_chords",id:"chord_2_svg",collection:this.collection});
			//var chord_03 = new D3_chord_v({el:"#all_chords",id:"chord_3_svg",collection:this.collection});
		},
		
		render:function () {
			
			this.$el.html(this.template({}));
			
		}
	});
	
	
	return D3_chords;

});