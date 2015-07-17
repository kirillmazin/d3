define(["d3"],function(d3){

  var D3_pie_v = Backbone.View.extend({
    initialize:function(data){

        this.amounts = data.numbers;
        this.is_blank = data.is_blank;
        this.blank_data  = [
          {"category":"revenue", "amount":"100"},
          {"category":"venture", "amount":"0"},
          {"category":"sbir", "amount":"0"}
            ];
        this.blank_color = "#f3f2f0";
        this.render();
    },

    render:function () {
      var radius = 30,
      padding = 5,
      width = radius*2+padding,
      height = width+5,


      thickness = 10;

      var color = d3.scale.ordinal()
      .range(["#005481", "#71cdf4", "#ffd200"]);

      var arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - thickness );

      var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.amount; });


      var svg = d3.select("#pie_charts").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + (radius) + "," + (radius+padding) + ")");


        var a = this.amounts;

        if(this.is_blank){
            a = this.blank_data;
        }

        var g = svg.selectAll(".arc")
          .data(pie(a))
          .enter().append("g")
          .attr("class", "arc")
          .on("mouseover", function (d) {

            


          });






          if(!this.is_blank){
             g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) {
                      return color(d.data.category);

                    });

          }

          if(this.is_blank){

            g.append("path")
                  .attr("d", arc)
                  .style("fill", this.blank_color);

          }

    }


  });

  return D3_pie_v;

});
