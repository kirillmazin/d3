define(['backbone'], function (Backbone) {
	
	var Startup_m = Backbone.Model.extend({
		defaults:{
			"campus":"UC Berkeley",
			"city":"Danville",
			"congressional": "CA11",
			"county": "Contra Costa County",
			"employees": "1",
			"latitude": "37.82806636",
			"longitude": "-121.9769279",
			"revenue": "$93,000",
			"sbir": "",
			"venture": "",
			"revenue_c":"",
			"sbir_c":"",
			"venture_c": "",
			"total_money":"",
			"state": "CA",
			"state_assembly": "Assembly District 16",
			"state_senate": "State Senate District 7",
			"tech": "Medical Therapeutics",
			"tech_broad": "Medical",
			"congressional_district_id":"",
			"state_assembly_district_id":"",
			"state_senate_district_id":"",
			"zip": "94526"
		}	
	});
	
	return Startup_m;

});