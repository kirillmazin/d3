define(['backbone','d3','models/startup_m'], function (Backbone, d3, Startup_m) {

	

	var Startups_c = Backbone.Collection.extend({
		model: Startup_m,
		initialize:function () {
			this.all_campuses    = [];

			this.tech_categories = [];
			this.circle_objects  = [];
		},

		test:function () {

			var scope = this;

			d3.csv("data/uc_startups_with_districts_info.csv", function (data) {
					//startup_data = data;
				//	console.log(data);
					scope.process_data(data);
				});
			/*
				d3.csv("data/uc_startups_with_districts_info.csv", this.process_data(data));
			*/
		},
		process_data: function (data) {
			//console.log(" --- let's process data ");





			for(var i=0; i<data.length;i++){

					var state = data[i].state;

					// only grab data for California
					if(state == "CA"){



							var campus     = data[i].campus;
							var tech_broad = data[i].tech_broad;

							this.all_campuses.push(campus);
							this.tech_categories.push(tech_broad);
						// money
							var revenue = (data[i].revenue == "") ? "$0" : data[i].revenue;
							var venture = (data[i].venture == "") ? "$0" : data[i].venture;
							var sbir = (data[i].sbir == "") 	  ? "$0" : data[i].sbir;


							revenue = revenue.replace(/,/gi, "");
							venture = venture.replace(/,/gi, "");
							sbir    = sbir.replace(/,/gi, "");




							revenue = parseInt(revenue.substr(1, revenue.length-1));
							venture = parseInt(venture.substr(1, venture.length-1));
							sbir = parseInt(sbir.substr(1, sbir.length-1));

							var total_money = revenue+venture+sbir;


							var employees = (data[i].employees == "") ? 0 : parseInt(data[i].employees);


							var congressional_district_id = parseInt(data[i].congressional.substr(2, 4));


							//console.log(congressional_district_id);


							// get ids of state assembly districts with UC startups

							var state_assembly_district_id = parseInt(data[i].state_assembly.split(" ")[2]);


							// get ids of state senate districts with UC startups
							var state_senate_district_id	= parseInt(data[i].state_senate.split(" ")[3]);

							data[i].total_money = total_money;
							data[i].revenue_c = revenue;
							data[i].sbir_c = sbir;
							data[i].venture_c = venture;
							data[i].employees = employees;

							data[i].congressional_district_id = congressional_district_id;

							data[i].state_assembly_district_id = state_assembly_district_id;

							data[i].state_senate_district_id = state_senate_district_id;

							//var circle_o = {};


							// data for circular diagrams

							//var c_o = {};



							data[i].campus_link 		= "campus."+data[i].campus.replace(/ /gi, "").toLowerCase();

							data[i].city_link			= data[i].city.replace(/ /gi, "").toLowerCase();



							data[i].data_link 		= "campus."+data[i].campus.replace(/ /gi, "").toLowerCase();
							data[i].city_link 		= data[i].city.replace(/ /gi, "").toLowerCase();
							data[i].tech_category 	= data[i].tech_broad.replace(/ /gi, "").toLowerCase() + "."+data[i].city_link;



							/* circle_o.campus = startup_data[i].campus;
							circle_o.campus_link = "campus."+startup_data[i].campus.replace(/ /gi, "").toLowerCase();
							circle_o.city   = startup_data[i].city;
							circle_o.city_link = startup_data[i].city.replace(/ /gi, "").toLowerCase();

							circle_o.money  = total_money;
							circle_o.tech  = startup_data[i].tech;
							circle_o.tech_category  = startup_data[i].tech_broad.replace(/ /gi, "").toLowerCase() + "."+circle_o.city_link;
							circle_o.tech_broad		= startup_data[i].tech_broad;

							circle_objects.push(circle_o); */



							this.add(data[i]);

					}


			}

			this.all_campuses =  _.uniq(this.all_campuses);
			this.tech_categories =  _.uniq(this.tech_categories);

			this.trigger("startups_loaded",{});

		}

	});

	return Startups_c;

});
