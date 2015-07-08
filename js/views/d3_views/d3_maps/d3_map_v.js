define(["backbone","d3","text!templates/d3_views/d3_maps/d3_map.html"], function (Backbone, d3, Tmpl_map) {

	var D3_map = Backbone.View.extend({
		template:_.template(Tmpl_map),
		initialize: function (data) {


			this.subview_id = data.subview_id;
			this.density_count;
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

			/*


			d3.json(map_data_path, function (error, json) {
				var scope = this;
				if(error){
					console.log(error);
				} else {
					console.log("data loaded");
					console.log(json);

				}


			});*/


		},

		test:function (error, json) {

			if(error){
				console.log(error);
			} else {

				console.log(json);


				for (var i = 0; i < json.features.length; i++) {

					var division = parseInt(json.features[i].properties.name);

					json.features[i].properties.division = this.density_count[division];

				//	console.log(" d " + division);
					//console.log("division " + division + " count "  + this.density_count[division] + ' // ' + isNaN(this.density_count[division]) );


					//json.features[i].properties.division = (this.density_count[division]!="undefined") ? this.density_count[division] : 0;*/


				}


				this.generate_vis(json);

			}

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



			svg.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("d", path)

				.attr("class","county-boundary")
				.style("fill", function (d) {
					var value = d.properties.division;
					if(value){
						return color(value);
						//return "#f3f2f0";
					} else {
						return "#f3f2f0";
					}
				})
				.on("click", function (d) {

					console.log("district " + d.properties.name);
					console.log("--- density " +d.properties.c_district);
				})
				.on("mouseover", function (d) {

					var sel = d3.select(this)
					.moveToFront()
					.transition()
					.style("stroke","#71cdf4")




					console.log(" zzzz " + d);
					console.log(d);



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

			/*
			svg.selectAll("circle")
				.data(locations)
				.enter()
				.append("circle")
				.attr("cx", function (d) { return projection([d.longitude, d.latitude])[0]})
				.attr("cy", function (d) { return projection([d.longitude, d.latitude])[1]})
				.attr("r",2)
				.style("opacity",0.2)
				.style("fill", "#f3681a");*/

		} // end of generate


	});

	return D3_map;


});
