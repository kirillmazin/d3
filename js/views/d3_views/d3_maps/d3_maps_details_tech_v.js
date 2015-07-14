define(["text!templates/d3_views/d3_maps/d3_details.html"],function(Tmpl){

  var D3_maps_details_tech_v = Backbone.View.extend({
    template:_.template(Tmpl),
    initialize:function(data){
      console.log("Let's build a tech summary");

      this.render();
    },
    render:function (argument) {
      this.$el.html("This is where the tech summary will go");
    },

    generate:function(matched){
        console.log(" lets generate the summary that we need");
        var tech_categories = []
        var all_objects = [];
        for(var i=0;i<matched.length; i++){
            console.log(matched[i].attributes);
            var o = {};
            var tech_category = matched[i].get("tech_broad");
            var revenue = matched[i].get("revenue_c");
            o.tech = tech_category;
            o.amount = revenue;

            all_objects.push(o);
            tech_categories.push(tech_category);

        }
        tech_categories = _.uniq(tech_categories);
        this.update_content(all_objects);
        console.log(  tech_categories);

    },

    update_content(obj){
      this.$el.html("");
      for(var i=0; i<obj.length;i++){
        this.$el.append(this.template({category:obj[i].tech, amount: obj[i].amount}));
      }
    }

  });

  return D3_maps_details_tech_v;


});
