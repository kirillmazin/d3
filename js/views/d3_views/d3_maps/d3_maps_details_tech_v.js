define(["text!templates/d3_views/d3_maps/d3_details.html"],function(Tmpl){

  var D3_maps_details_tech_v = Backbone.View.extend({
    template:_.template(Tmpl),
    initialize:function(data){
      console.log("Let's build a tech summary");
      this.all_totals = [];
      this.render();
    },
    render:function (argument) {
      this.$el.html("This is where the tech summary will go");
    },

    generate:function(matched){


        var tech_categories = []

        var all_objects = [];
        for(var i=0;i<matched.length; i++){

            var o = {};
            var tech_category = matched[i].get("tech_broad");
            var revenue = matched[i].get("revenue_c");
            var venture = matched[i].get("venture_c");
            var sbir    = matched[i].get("sbir_c");
            o.tech = tech_category;
            o.amount = revenue + venture + sbir;

            all_objects.push(o);
            tech_categories.push(tech_category);

        }
        tech_categories = _.uniq(tech_categories);
        this.update_content(all_objects);

        this.calculate_totals(all_objects, tech_categories);


    },
    calculate_totals:function(all_objects, tech_categories){
      var total = 0;
      var totals = [];
      for(var i=0;i<tech_categories.length;i++){

        totals[tech_categories[i]] = 0;
      //  console.log(" tech category ");
      //  console.log(tech_categories[i]);
        for(var j=0;j<all_objects.length;j++){
            if(tech_categories[i] == all_objects[j].tech ){
              totals[tech_categories[i]] += all_objects[j].amount;

            }

        }


      }

    //  this.dot_tech =	new D3_dot_details_v({el:"#bubble_tech",id:"dots_tech_svg", subview_id:":dots_tech", collection:this.collection, param_object: this.collection.all_campuses, category:"campus"});


      this.update_content(totals);

    },
    update_content:function(obj){
      this.$el.html("");

      for(var i in obj){

        this.$el.append(this.template({category:i, amount: obj[i]}));
      }



    }

  });

  return D3_maps_details_tech_v;


});
