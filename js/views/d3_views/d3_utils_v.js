define(
["backbone"],
function (Backbone) {

	var D3_utils_v = Backbone.View.extend({
		initialize: function () {
			this.all_subviews = [];
			//console.log("initialize UTIL class");
		},
		hide:function () {
			this.$el.hide();
		},
		show:function () {
			this.$el.show();
		},
		hide_subviews:function(){
			for(var i=0;i<this.all_subviews.length;i++){
						this.all_subviews[i].hide();


			}
		},
		show_subviews:function(o){
			for(var i=0;i<this.all_subviews.length;i++){
						this.all_subviews[i].update(o);




			}


		},

		render:function () {

			this.$el.html(this.template({}));

		}
	});

	return D3_utils_v;


});
