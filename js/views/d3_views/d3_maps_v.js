define([
"views/d3_views/d3_utils_v",
"views/nav/subnav_content_v",
"views/d3_views/d3_maps/d3_map_v",
"views/d3_views/d3_maps/d3_map_details_v",
"text!templates/d3_views/d3_maps.html"
],
function(D3_utils_v, Subnav_content_v, d3_map, D3_map_details_v, Templ_maps)
{


	var D3_maps = D3_utils_v.extend({
		template:_.template(Templ_maps),
		initialize:function () {





			this.congressional_districts 	   = [];
			this.congressional_districts_density = [];

			this.state_assembly_districts	 =  [];
			this.state_assembly_districts_density	 =  [];


			this.state_senate_districts	 =  [];
			this.state_senate_districts_density	 =  [];


			this.process();
			this.render();
			this.all_maps = [];



			this.map_01 = new d3_map({el:"#all_maps",id:"map_1_svg", subview_id:":map_01", division_type:"us_congress"});
			this.map_01.map_data("js/data/us_congressional_districts_simpler.json",this.congressional_districts_density);




			this.map_02 = new d3_map({el:"#all_maps",id:"map_2_svg", subview_id:":map_02", division_type:"state_assembly"});
			this.map_02.map_data("js/data/california_state_assembly_simpler.json",this.state_assembly_districts_density);



			this.map_03 = new d3_map({el:"#all_maps",id:"map_3_svg", subview_id:":map_03", division_type:"state_senate"});
			this.map_03.map_data("js/data/california_state_senate_districts_simpler.json",this.state_senate_districts_density);


			// create an array of map object for looping
			this.all_maps.push(this.map_01);
			this.all_maps.push(this.map_02);
			this.all_maps.push(this.map_03);

			this.map_details_v =  new D3_map_details_v({collection:this.collection, el:"#details_view"});

			this.listen_to_map_updates();

		},
		listen_to_map_updates:function () {
			// body...

			for(var i=0;i<this.all_maps.length;i++){
					this.map_details_v.listenTo(this.all_maps[i],"update",this.map_details_v.update)

			}
		},


		process:function () {
			for(var i=0;i<this.collection.length;i++){


				var id = this.collection.at(i).get("congressional_district_id");
				var st_as_id = this.collection.at(i).get("state_assembly_district_id");
				var st_snt_id = this.collection.at(i).get("state_senate_district_id");


				if(!isNaN(id)){
					if(!this.congressional_districts[id]){
						this.congressional_districts[id] = [];
					}

					this.congressional_districts[id].push(id);
				}

				if(!isNaN(st_as_id)){
					if(!this.state_assembly_districts[st_as_id]){
						this.state_assembly_districts[st_as_id] = [];
					}

					this.state_assembly_districts[st_as_id].push(st_as_id);
				}

				if(!isNaN(st_snt_id)){
					if(!this.state_senate_districts[st_snt_id]){
						this.state_senate_districts[st_snt_id] = [];
					}

					this.state_senate_districts[st_snt_id].push(st_snt_id);
				}


				//this.state_assembly_districts

			}

			this.congressional_districts_density 	= this.calculate_density(this.congressional_districts);

			this.state_assembly_districts_density 	= this.calculate_density(this.state_assembly_districts);

			this.state_senate_districts_density 	= this.calculate_density(this.state_senate_districts);



		},
		render:function () {

			this.$el.html(this.template({}));

		},

		calculate_density:function (districts) {

			var districts_count = [];
			for(var k in districts){



			districts_count[k] = districts[k].length;

			}


			return districts_count;
		},
		hide_all_maps:function(){

				for(var i=0;i<this.all_maps.length;i++){
								this.all_maps[i].hide();

				}
		},
		show_maps:function (o) {
			for(var i=0;i<this.all_maps.length;i++){
							this.all_maps[i].update(o);

			}
		},

		update: function (o) {

			this.hide_all_maps();

			console.log(o);

			if(o.subview){
					this.show_maps(o);


			}
		}

	});

	return D3_maps;

});
