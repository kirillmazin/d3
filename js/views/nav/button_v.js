define([
"jquery",
"underscore",
"backbone",
"text!templates/button.html"], function ($, _,Backbone,Tmpl_button) {
	
	var Button_v = Backbone.View.extend({
		template:_.template(Tmpl_button),
		
		
		
		initialize:function () {
		
			
			this.render();
			this.attach_events();
			
		},
		attach_events:function(){
		
			
			this.$("#"+this.id).on("click",$.proxy(this.dotheclick,this));
			
			//this.$("#"+this.id).css("background-color","#000")
		},
		onmouseenter: function () {
			
			
		},
		dotheclick:function () {
			//console.log("------" + this.model.get("header"));
			var header = this.model.get("header");
			this.trigger("update",{id:this.id, header: header});
		},
		render:function () {
			
			
			
			this.$el.append(this.template({title:this.model.get("header"),id:this.id}));
			return this;
		}
	});
	
	return Button_v;
	

});