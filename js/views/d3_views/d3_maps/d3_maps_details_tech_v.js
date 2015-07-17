define(["backbone","text!templates/d3_views/d3_maps/d3_details.html"],function(Backbone,Tmpl){

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
            console.log(matched[i]);
            var o = {};
            var tech_category = matched[i].get("tech_broad");
            var revenue       = matched[i].get("revenue_c");
            var venture       = matched[i].get("venture_c");
            var sbir          = matched[i].get("sbir_c");
            var employees     = matched[i].get("employees");
            o.tech = tech_category;
            o.amount = revenue + venture + sbir;
            o.employees = employees;
            all_objects.push(o);
            tech_categories.push(tech_category);

        }
        tech_categories = _.uniq(tech_categories);
        this.update_content(all_objects);

        this.calculate_totals(all_objects, tech_categories);


    },
    calculate_totals:function(all_objects, tech_categories){


      var category_totals = [];

      for(var i=0;i<tech_categories.length;i++){


        var o = {};
        o.category = tech_categories[i];
        o.amount = 0;
        o.employees = 0;


        for(var j=0;j<all_objects.length;j++){
            if(tech_categories[i] == all_objects[j].tech ){
              o.amount += all_objects[j].amount;
              o.employees += all_objects[j].employees;
            }

        }

        category_totals.push(o);



      }



     this.update_content(category_totals);

    },

    format_number:function(num){

    },
    update_content:function(obj){
      this.$el.html("");
        //console.log(obj);
        //console.log(emp);
        var e_n = [];


      for(var i=0;i<obj.length;i++){

          this.$el.append(this.template({category:obj[i].category, amount: obj[i].amount.formatMoney(0), employees: obj[i].employees}));
      }




    }

  });

  return D3_maps_details_tech_v;


});
