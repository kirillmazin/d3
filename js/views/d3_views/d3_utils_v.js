define(
["backbone"],
function (Backbone) {

	var D3_utils_v = Backbone.View.extend({
		initialize: function () {
			//console.log("initialize UTIL class");
		},
		hide:function () {
			this.$el.hide();
		},
		show:function () {
			this.$el.show();
		},
		
		render:function () {
			
			this.$el.html(this.template({}));
			
		}
	});
	
	return D3_utils_v;


});
