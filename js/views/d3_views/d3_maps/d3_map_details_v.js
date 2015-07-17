define([
  "views/d3_views/d3_maps/d3_dot_details_v",
  "views/d3_views/d3_maps/d3_chord_details_v",
  "views/d3_views/d3_maps/d3_maps_details_tech_v",
  "views/d3_views/d3_maps/d3_pie_v",
  "text!templates/d3_views/d3_maps/d3_details.html"],
  function(D3_dot_details_v, D3_chord_details_v, D3_tech_summary_v, D3_pie_v, Tmpl_details) {
  var D3_map_details_v = Backbone.View.extend({
    template: _.template(Tmpl_details),
    initialize: function() {




      this.division_title;
      this.division_id;

      this.last_event;
      this.pie_charts;
      this.tech_summary = new D3_tech_summary_v({el:"#tech_areas"});

/*

var svg_id 					= "chord_" + (i+1)+"_svg";
var container_id 		= "container_chord_" + (i+1);
var category 				= this.collection.tech_categories[i];
var zero_padding   = "0";

*/

     this.dot_tech =	new D3_dot_details_v({el:"#bubble_tech",id:"dots_tech_svg",collection:this.collection, param_object:  this.collection.tech_categories,category:"tech" });
     this.chord_tech = new D3_chord_details_v({el:"#chords_tech",id:"chords_tech_01",container_id: "chords_tech_svg", subview_id:":chords_tech",collection:this.collection, category:"Medical"});
    },
    render: function() {

      this.$el.html(this.template({}));


    },

    update_techareas: function(o) {
      $("#tech_areas").html("");
      $("#division_title").html(this.division_title + " " + this.division_id);
      for (var i = 0; i < o.length; i++) {
        $("#tech_areas").append("<h1>" + o[i].get("tech") + "</h1>");
      }
    },
    /**
     * Loop through the collection and find the matching models based on where
     * the user has clicked
     */
    get_matching_data: function(id, search_type) {
      var matched_objects = [];


      for (var i = 0; i < this.collection.length; i++) {
        var m = this.collection.at(i);

        var id_to_match = m.get(search_type);

        if (id == id_to_match) {
          matched_objects.push(m);


        }

      }
      return matched_objects;
    },
    array_of_models: function(id, search_type) {
      var matched_objects = [];


      for (var i = 0; i < this.collection.length; i++) {
        var m = this.collection.at(i);


        var id_to_match = m.get(search_type);

        if (id == id_to_match) {
      //    console.log(id + ' /// id to match ' + id_to_match)
          matched_objects.push(m);


        }




      }

    //  console.log(matched_objects);
      return matched_objects;
    },
    graph_pie: function(o) {

      $("#pie_charts").html("");
      this.pie_charts = [];


      for (var i = 0; i < o.length; i++) {


        var amounts = [];
        var venture = {
          "category": "venture",
          "amount": String(o[i].get("venture_c"))
        };
        var revenue = {
          "category": "revenue",
          "amount": String(o[i].get("revenue_c"))
        };
        var sbir = {
          "category": "sbir",
          "amount": String(o[i].get("sbir_c"))
        };

        var total_money = o[i].get("total_money");

        var blank = (total_money == 0) ? true : false;


        amounts.push(venture);
        amounts.push(revenue);
        amounts.push(sbir);

        this.pie_charts.push(new D3_pie_v({
          el: "#pie_charts",
          numbers: amounts,
          is_blank: blank
        }));
      }

    },

    /**
    * Triggered when the user is interacting with the regions on the map
    */

    process_event: function(event) {

      var id = Number(event.id);
      var object_search_type;

      this.division_id = id;
      if (event.type == "us_congress") {
        this.division_title = "Congressional District";
        object_search_type = "congressional_district_id";
      }

      if (event.type == "state_assembly") {

        this.division_title = "California Assembly District";
        object_search_type = "state_assembly_district_id";

        // search for state_assembly_district_id

      }

      if (event.type == "state_senate") {

        this.division_title = "California Senate District";
        object_search_type = "state_senate_district_id";
        // search for state_senate_district_id

      }

      // objects from the dataset that relate to the region that the user is interacting with
      var matched = this.get_matching_data(id, object_search_type);
      var all_matched =               this.array_of_models(id, object_search_type);

      if(matched.length > 0){

        var total_revenue = this.count_totals(matched, "total_money");
        var number_of_employees = this.count_totals(matched, "employees");





        this.dot_tech.build_data(matched);


      }

      this.chord_tech.create_data_object(all_matched);

      this.graph_pie(matched);
      var total_revenue = this.get_total_revenue(matched);
      this.tech_summary.generate(matched);


      $("#division_title").html(this.division_title + " " + id);
      $("#money_generated").html("$" + total_revenue.formatMoney(0));
      $("#number_of_employees").html(number_of_employees);
      $("#number_of_startups").html(matched.length);
      //  this.update_techareas(matched);


    },

    get_total_revenue: function(matched) {

      var amount = 0;
      for (var i = 0; i < matched.length; i++) {
        var t_m = matched[i].get("total_money");
        amount += t_m;

      }
      return amount;


    },
    /**
     * Calculate the number of employees per division
     **/

    count_totals: function(matched, to_count) {
      var amount = 0;
      for (var i = 0; i < matched.length; i++) {


        var t = matched[i].get(to_count);

        amount += t;

      }
      return amount;

    },
    update: function(event) {

      this.last_event = event;
      this.process_event(this.last_event);
    }

  });

  return D3_map_details_v;

});
