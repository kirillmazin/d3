require.config({
	
	paths: {
	
		domReady:'libs/domReady',
		text: 'libs/text',
		jquery:'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		d3: 'libs/d3',
		packages: 'libs/packages'
	},
	shim : {
		d3: {
			exports: 'd3'
		},
		packages: {
			exports: 'packages'
		},
		backbone: {
			deps: ['jquery','underscore']
		}
		
		
		
	}
	

});





require(['domReady','views/app_v'], function (domReady, App_v) {


	
	domReady( function () {
	
		
		var app_v = new App_v();
		
		app_v.render();
				
		
	});

});