define(["backbone","d3","text!templates/d3_views/d3_maps/d3_map.html"], function (Backbone, d3, Tmpl_map) {

	var D3_map = Backbone.View.extend({
		template:_.template(Tmpl_map),
		initialize: function (data) {


			this.subview_id = data.subview_id;
			this.density_count;
			this.active_map_element = {};
			this.division_type = data.division_type;
			this.render();
		},

		render:function () {

			this.$el.append(this.template({id:this.id}));

		},




		hide:function(){

			this.$("#"+this.id).css("display","none");
		},
		show:function(){
			this.$("#"+this.id).css("display","block");

		},
		update:function(o){
			if(o.subview == this.subview_id){
				this.show();
			} else {
				this.hide();
			}
		},
		map_data:function (map_data_path,density_count) {

			this.density_count = density_count;
			d3.json(map_data_path, $.proxy(this.test,this));




		},

		test:function (error, json) {

			if(error){
				console.log(error);
			} else {

				console.log(json);


				for (var i = 0; i < json.features.length; i++) {

					var division = parseInt(json.features[i].properties.name);

					json.features[i].properties.division = this.density_count[division];


				}


				this.generate_vis(json);

			}

		},
		get_the_data:function (id) {

			this.trigger("update",{type:this.division_type,id:id});

		},
		set_active_element:function(item, color){
				this.active_map_element.item  = item;
				this.active_map_element.color = color;
		},
		get_active_element:function (id) {
			return this.active_map_element;
		},
		generate_vis:function(data) {



			/*var money_scale = d3.scale.linear()
								.domain([0, d3.max(all_the_money, function (d) {return d})
								])
								.range([10, 100]);*/

			var color = d3.scale
						.quantize()
						.range(["rgb(217,230,236)",
								"rgb(153,187,205)",
								"rgb(51,118,154)",
								"rgb(0,85,129)"]);




			color.domain([
					d3.min(data.features, function (d) { return d.properties.division; }),
					d3.max(data.features, function (d) { return d.properties.division; })
					]);

			var w      = 800;
			var h      = 800;
			var padding = 50;

			var svg   = d3.select("#"+this.id)
			.attr("width", w)
			.attr("height", h)

			var rotate = [115,0];

			var projection = d3.geo.albers()
								.translate([600, 300])
								.scale([4500])
								.rotate(rotate);





			var path = d3.geo.path()
						.projection(projection);



			var context = 	this;
			// colors
			var orange = "#ff6d1b";
			var blue = "#71cdf4";

			svg.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("class","county-boundary")
				.attr("id",function(d){ return "map_"+d.properties.external_id})
				.style("fill", function (d) {
					var value = d.properties.division;
					if(value){
						return color(value);
					} else {
						return "#f3f2f0";
					}
				})
				.on("click", function (d) {
						context.get_the_data(d.properties.name);


					 var o =	context.get_active_element();

					 if(o.item != undefined){
					 	d3.select(o.item)
					 	.style("fill", o.color);
					}


						context.set_active_element(this, this.style.fill);

						var sel = d3.select(this)
						.moveToFront()
						.transition()
						.style("fill",orange);

				})
				.on("mouseover", function (d) {


					var o = context.get_active_element(this, this.style.fill);

					// don't allow on hover over selected areas
					if(o.item != this){
						var sel = d3.select(this)
						.moveToFront()
						.transition()
						.style("stroke",blue)
					}










				})
				.on("mouseout", function (d) {

					var value = d.properties.c_district;
					var color_over = (value)? color(value): "#f3f2f0";

					d3.select(this)
					.moveToBack()
					.transition()
					.style("stroke","#fff")
					.style("opacity",1);

				})



		} // end of generate


	});

	return D3_map;


});
