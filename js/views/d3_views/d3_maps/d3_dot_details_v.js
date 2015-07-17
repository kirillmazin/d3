define([
"backbone",
"views/d3_views/d3_utils_v",
"text!templates/d3_views/d3_dot.html"],
function( Backbone, D3_utils_v, Templ_dot)
{


	var D3_dot_details_v = D3_utils_v.extend({
		template:_.template(Templ_dot),
		initialize:function (data) {




			this.param_object = data.param_object;
			this.category   = data.category;
			this.data_objects = [];
			this.subview_id = data.subview_id;

			this.complete_dot_data = [];
			this.render();
		//	this.build_dot_data(this.collection);
		},
		hide:function(){
				this.$("#"+this.id).css('display','none');

		},

		show:function(){

				this.$("#"+this.id).css('display','block');

		},

		update:function(o){

			if(o.subview == this.subview_id){
				this.show();
			} else {
				this.hide();
			}

		},
		build_data:function(matched){

			this.data_objects = [];
			this.complete_dot_data = [];

			for(var i=0;i<matched.length;i++){




				var o 						= {};
				o.name 						= matched[i].get('city');
				o.tech 						= matched[i].get('tech_broad');
				o.size 						= matched[i].get('total_money');
				o.state_assembly 	= matched[i].get('state_assembly');
				o.campus 					= matched[i].get('campus');



				this.data_objects.push(o);
			}


			this.complete_dot_data = [];

			for(var i=0;i<this.param_object.length;i++){
				this.complete_dot_data.push(this.find_segment(this.param_object[i],this.category,this.data_objects));
			}

			//	console.log(this.complete_dot_data);


			this.generate(this.complete_dot_data, this.id);

		},

		build_dot_data:function (data_object) {

			//var param_object  = this.collection.all_campuses;

			for(var i=0;i<data_object.length;i++){




				var o 			= {};
				o.name 			= data_object.at(i).get('city');
				o.tech 			= data_object.at(i).get('tech_broad');
				o.size 			= data_object.at(i).get('total_money');
				o.state_assembly 	= data_object.at(i).get('state_assembly');
				o.campus 			= data_object.at(i).get('campus');



				this.data_objects.push(o);
			}


			this.complete_dot_data = [];

			for(var i=0;i<this.param_object.length;i++){
				this.complete_dot_data.push(this.find_segment(this.param_object[i],this.category,this.data_objects));
			}
			this.generate(this.complete_dot_data, this.id);

		},
		render:function () {

			this.$el.append(this.template({id:this.id}));

		},

		find_segment:function (segment_name, category, data_objects) {



			var o = {};
			o.name = segment_name;
			o.children = [];


			for(var i=0;i<data_objects.length;i++){

				if(data_objects[i].size == 0){
					data_objects[i].size = 1;
				}

				if(data_objects[i][category] == o.name){

					o.children.push(data_objects[i]);

				}

			}



			return o;

		},

		generate:function (flare_obj, svg_id) {


			$("#" + svg_id).empty();
			var f_o 	 = {};
			f_o.name 	 = "flare";
			f_o.children = [];
			f_o.children = flare_obj;


			/*
			"name": "flare",
			"children":
			*?*/

			var diameter = 500,
			    format = d3.format(",d"),





			    color = d3.scale.ordinal()
			    	  .domain(["Medical",
			    	  			"Research Tools",
			    	  			"Information Technology",
			    	  			"Agriculture",
			    	  			"Advanced Materials",
			    	  			"Electronic Systems",
			    	  			"Environment",
			    	  			"Energy",
			    	  			"Transportation"])
			          .range(["#005481", "#71cdf4","#bce2f6","#ffd200","#f3681a","#f3681a","#1ba0db","#ffb511","#e64d9a"]);


			color = d3.scale.ordinal()

			      .range(["#005481", "#71cdf4","#bce2f6","#ffd200","#f3681a","#f3681a","#1ba0db","#ffb511","#e64d9a","#f3e7ed","#ffb0df","#e64d9a","#a47492","#402c38"]);


			color = d3.scale.ordinal()

			      .range(["#005481","#33769a","#6698b3","#99bbcd","#ccdde6",
			      "#f3681a","#f58648","#f8a476","#fac3a3","#fde1d1",
			      "#a47492","#b690a8","#c8acbe","#dbc7d3","#ede3e9",
			      "#7a8684","#959e9d","#afb6b5","#cacfce","#e4e7e6"]);


			      color = d3.scale.ordinal()

			            .range(["#7a8684","#cacfce","#a47492","#dbc7d3","#f3681a","#fac3a3","#005481","#99bbcd","#ffd200","#ffed99","#71cdf4","#c6ebfb"]);


			//color = d3.scale.category20c();



			var bubble = d3.layout.pack()
			    .sort(null)
			    .size([diameter, diameter])
			    .padding(1.5);

			var svg   = d3.select("#" + svg_id)
			    .attr("width", diameter)
			    .attr("height", diameter)
			    .attr("class", "bubble");


			  var node = svg.selectAll(".node")
			      .data(bubble.nodes(classes(f_o))
			      .filter(function(d) { return !d.children; }))
			    .enter().append("g")
			      .attr("class", "node")
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


			  node.append("circle")
			      .attr("r", function(d) { return d.r; })
			      .style("fill", function(d) { return color(d.packageName); })
			      .on("mouseover",function (d) {


			      	var xPosition = Math.round(d.x);
			      	var yPosition = Math.round(d.y+17);

			      	//var xPosition = 0;
			      	//	var yPosition = 0+17;

			  		d3.select("#tooltip")
			  		.transition()
			  		.style("opacity", 1);

			      	d3.select("#tooltip")
			      		.style("left",xPosition + "px")
			      		.style("top",yPosition + "px")
			      		.select("#tech")
			      		.text(d.tech)


			      	d3.select("#value")
			      	 		.text("$"+d.value);

			      	d3.select("#state_assembly")
			      		 		.text(d.campus);




			      })
			      .on("mouseout", function (d) {
			      		console.log(" out ");
								console.log(d.value);
								console.log(d.tech);
			      		d3.select("#tooltip")
			      		.style("opacity", 0);


			      });



			function classes(root) {
			  var classes = [];

			  function recurse(name, node) {
			    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
			    else classes.push({packageName: name, className: node.name, value: node.size, tech: node.tech, state_assembly:node.state_assembly, campus:node.campus});
			  }

			  recurse(null, root);
			  return {children: classes};
			}

			d3.select(self.frameElement).style("height", diameter + "px");

		}
	});

	return D3_dot_details_v;

});
