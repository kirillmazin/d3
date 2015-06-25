(function() {
  packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      function find(name, display, data) {
      
      
      	
        var node = map[name], i;
        
        
        //console.log("------" + name);
        
        if (!node) {
        	 //console.log("//// not node " + display);
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
            
            // ugly hack
            if(display != undefined){
            	node.display = display;
            }
           
          }
        }
        return node;
      }

      classes.forEach(function(d) {
      	      
        find(d.name, d.display, d);
      });

      return map[""];
    },

    // Return a list of imports for the given array of nodes.
    imports: function(nodes) {
      var map = {},
          imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
      	
        map[d.name] = d;
   		
      });
      
      
      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.imports) d.imports.forEach(function(i) {
          imports.push({source: map[d.name], target: map[i]});
        });
      });

      return imports;
    }

  };
})();