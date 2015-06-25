define([
"backbone",
"views/d3_views/d3_utils_v",
"views/d3_views/d3_dot_v",
"text!templates/d3_views/d3_dots.html"], 
function( Backbone,  D3_utils_v, D3_dot_v, Templ_dots) 
{

	
	var D3_dots = D3_utils_v.extend({
		template:_.template(Templ_dots),
		initialize:function () {
			//console.log(" ---- Initialize D3 dots");
			//console.log(this.$el);
			
			//console.log(this.collection.length);
			//console.log(this.collection.all_campuses);
			
			
			this.data_objects = [];
			
			
			
			this.render();
			this.dot_one =	new D3_dot_v({el:"#all_dots",id:"dots_1_svg", collection:this.collection, param_object: this.collection.all_campuses, category:"campus"});
			this.dot_one =	new D3_dot_v({el:"#all_dots",id:"dots_2_svg", collection:this.collection,  param_object: this.collection.tech_categories,category:"tech"});
		},
		
		
		
		find_segment:function (segment_name, comparator) {
			
		
			
			var o = {};
			o.name = segment_name;
			o.children = [];
			
			
			for(var i=0;i<flare_objects.length;i++){
				
				if(flare_objects[i].size == 0){
					flare_objects[i].size = 1;
				}
				
				if(flare_objects[i][comparator] == o.name){
					
					o.children.push(flare_objects[i]);
					
				}
			
			}
			
			
			
			return o;
		
		}
	});
	
	return D3_dots;

});