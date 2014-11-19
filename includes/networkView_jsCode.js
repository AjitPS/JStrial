/*
 * @author singha
 * @name example code for Network View using Javascript, jQuery, CytoscapeJS, Arbor.js, QTip & JSON.
 * @description jQuery function to create the graph (on DOM ready).
 * @returns
 **/
$(function(){ // on dom ready

  var geneJSON= {
      /** Nodes are actual concepts that we intend to plot. These may be Genes, Phenotypes, Enzymes, Compounds, 
       * Cellular components, Publications, Biological Processes, Pathways, Reactions, Proteins, Protein Domains,
       * Trait Ontologies, Enzyme Classifications or Molecular Functons. **/
      nodes: [
        { data: { id: 'n1', value: 'AT5G4893i' , conceptType: 'Gene', conceptShape: 'triangle', conceptColor: 'cyan' } },
        { data: { id: 'n2', value: 'AT5G1470i' , conceptType: 'Gene', conceptShape: 'triangle', conceptColor: 'cyan' } },
        { data: { id: 'n3', value: 'Lignin formation' , conceptType: 'Compound', conceptShape: 'heptagon', conceptColor: 'teal' } },
        { data: { id: 'n4', value: 'Lignin content' , conceptType: 'TraitOntology', conceptShape: 'pentagon', conceptColor: 'yellow' } },
        { data: { id: 'n5', value: 'PMID:17237352' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n6', value: 'PMID:15161961' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n7', value: 'PMID:17163881' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n8', value: 'PMID:20511296' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n9', value: 'PMID:21251001' , conceptType: 'Publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n10', value: 'AT5G1470' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n11', value: 'POPTR_0001s34880' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n12', value: 'POPTR_0001s34880' , conceptType: 'Gene', conceptShape: 'triangle', conceptColor: 'cyan' } },
        { data: { id: 'n13', value: 'NmrA' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey' } },
        { data: { id: 'n14', value: 'Polysacc_synt_2' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey' } },
        { data: { id: 'n15', value: 'adh_short' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey' } },
        { data: { id: 'n16', value: '3Beta_HSD' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey' } },
        { data: { id: 'n17', value: 'Epimerase' , conceptType: 'ProteinDomain', conceptShape: 'pentagon', conceptColor: 'grey' } },
        { data: { id: 'n18', value: 'AT5G48930' , conceptType: 'CellularComponent', conceptShape: 'pentagon', conceptColor: 'lightGreen' } },
        { data: { id: 'n19', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n20', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n21', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n22', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n23', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n24', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n25', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n26', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n27', value: 'DFR' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
        { data: { id: 'n28', value: 'A1' , conceptType: 'Protein', conceptShape: 'ellipse', conceptColor: 'red' } },
      ], 
      
      /** Edges define how nodes are inter-linked using 'source' & 'target' attributes. **/
      edges: [
        { data: { id: 'n1n2', source: 'n1', target: 'n2' } },
        { data: { id: 'n1n3', source: 'n1', target: 'n3' } },
        { data: { id: 'n1n4', source: 'n1', target: 'n4' } },
        { data: { id: 'n1n5', source: 'n1', target: 'n5' } },
        { data: { id: 'n1n6', source: 'n1', target: 'n6' } },
        { data: { id: 'n1n7', source: 'n1', target: 'n7' } },
        { data: { id: 'n1n8', source: 'n1', target: 'n8' } },
        { data: { id: 'n1n9', source: 'n1', target: 'n9' } },
        { data: { id: 'n2n3', source: 'n2', target: 'n3' } },
        { data: { id: 'n2n10', source: 'n2', target: 'n10' } },
        { data: { id: 'n11n10', source: 'n11', target: 'n10' } },
        { data: { id: 'n12n11', source: 'n12', target: 'n11' } },
        { data: { id: 'n11n13', source: 'n11', target: 'n13' } },
        { data: { id: 'n11n14', source: 'n11', target: 'n14' } },
        { data: { id: 'n11n15', source: 'n11', target: 'n15' } },
        { data: { id: 'n11n16', source: 'n11', target: 'n16' } },
        { data: { id: 'n11n17', source: 'n11', target: 'n17' } },
        { data: { id: 'n1n18', source: 'n1', target: 'n18' } },
        { data: { id: 'n11n19', source: 'n11', target: 'n19' } },
        { data: { id: 'n11n20', source: 'n11', target: 'n20' } },
        { data: { id: 'n11n21', source: 'n11', target: 'n21' } },
        { data: { id: 'n11n22', source: 'n11', target: 'n22' } },
        { data: { id: 'n11n23', source: 'n11', target: 'n23' } },
        { data: { id: 'n11n24', source: 'n11', target: 'n24' } },
        { data: { id: 'n11n25', source: 'n11', target: 'n25' } },
        { data: { id: 'n11n26', source: 'n11', target: 'n26' } },
        { data: { id: 'n11n27', source: 'n11', target: 'n27' } },
        { data: { id: 'n11n28', source: 'n11', target: 'n28' } },
      ]
    };

    // Display 'geneJSON' elements.nodes data in console.
    for(var j = 0; j < geneJSON.nodes.length; j++){
        console.log("JSON node.data (id, value, conceptType, conceptShape, conceptColor): "+ 
                geneJSON.nodes[j].data.id +" , "+ geneJSON.nodes[j].data.value +" , "+ 
                geneJSON.nodes[j].data.conceptType +" , "+ geneJSON.nodes[j].data.conceptShape +" , "+ 
                geneJSON.nodes[j].data.conceptColor);
       }

// Initialise a cystoscape instance as a Javascript object.
/* var cy= cytoscape({
  container: document.getElementById('cy'),
  elements: geneJSON,
  layout: {
    name: 'cose', // Cose layout example
    padding: 5
  },
  
  ready: function() {
   console.log('ready');
   window.cy= this;
  }
});*/

// Initialise a cystoscape instance on the HTML DOM using JQuery.
$('#cy').cytoscape({
  container: document.getElementById('cy'),

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(value)',
        'outline-colour': 'black', // text outline color
        'border-style': 'solid', // node border
        'border-width': '1px',
        'font-size': '8px',
        // Set node shape & color depending on node type (read 'type' from JSON).
        'shape': 'data(conceptShape)', // 'triangle',
        'width': '30px',
        'height': '30px',
        'background-color': 'data(conceptColor)'
       })
    .selector('edge')
      .css({
        'content': 'linked to', // label for edges (arrows)
        'font-size': '8px',
        'width': '3px',
        'curve-style': 'bezier', /* default value: bezier; options: bezier, unbundled-bezier, haystack */
        'line-color': 'gray',
        'line-style': 'solid',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'gray'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),

  // Using the JSON data to create the nodes.
  elements: geneJSON,
  
  // Layout of the Nodes.
  layout: {
    name: 'cose', // Cose layout
    roots: '#n12',
    padding: 5

/*    name: 'circle', // Circle layout
//     name: 'breadthfirst', // Breadth first layout
    directed: true,
    roots: '#n12',
    padding: 10*/
  },
  
  ready: function() {
   console.log('ready');
   window.cy= this;
  }
});

// Get the cystoscape instance as a Javascript object from JQuery.
var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

// Pan & zooms the graph to fit all the elements (concept nodes) in the graph.
//cy.fit();

// Add a generic Qtip message to all the nodes using QTip.
cy.elements('node').qtip({
  content: function() {
      var nodeQtip= this.data('conceptType') +": "+ this.data('value'); // this.id();
      return nodeQtip;
     },
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 12,
      height: 6
    }
  }
});

// Add a generic Qtip message to all the Edges using QTip.
cy.elements('edge').qtip({
  content: function() {
      var nodeQtip= "Type: Edge, id: "+ this.id();
      return nodeQtip;
     },
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 12,
      height: 6
    }
  }
});

// Event handling: mouse 'tap' event on all the nodes.
cy.on('tap', 'node', function(e){
      var thisNode= e.cyTarget;
      var nodeDetails= thisNode.data('conceptType') +": "+ thisNode.data('value');
      console.log("Current concept (node): "+ nodeDetails);
    });

// Event handling: mouse 'tap' event on all the edges.
cy.on('tap', 'edge', function(e){
      var thisEdge= e.cyTarget;
      var edgeDetails= "Type: Edge, id: "+ thisEdge.id();
      console.log("Current relation (edge): "+ edgeDetails);
    });

// Popup (context) menu: a circular Context Menu for each Node (concept) using the 'cxtmenu' jQuery plugin.
var circularNodeContextMenu= {
    menuRadius: 70, // 100, // the radius of the circular menu in pixels
    selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
    commands: [ // an array of commands to list in the menu
        {
         content: 'Change',
         select: function() {
             // a function to execute when the command is selected
             console.log("Change command selected; nodeID: "+ this.id()); // 'this' holds the reference to the active element
            }
        },
            
        {
         content: 'Hide',
         select: function() {
             console.log("Hide command selected; nodeID: "+ this.id());
             this.hide(); // hide the selected 'node' element.
            }
        },
            
        {
         content: 'Show All',
         select: function() {
             console.log("Show command selected; nodeID: "+ this.id());
             cy.elements('node').show(); // show all nodes.
             cy.elements('edge').show(); // show all edges
            }
        },
            
        {
         content: 'Item Info',
         select: function() {
        /*     itemInfo= window.open("ItemInfo.html", "itemInfoWindow", 
                    "height=200, width=400, location=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, titlebar=no, directories=no, status=no");
             var nodeInfo= "<div>Concept Type: "+ this.data('conceptType') +"<br/> Value: "+ this.data('value') +
                     "<br/> <br/><u>Properties:</u> <br/> id: "+ this.id() +"<br/> Shape: "+ this.data('conceptShape') +
                     "<br/> Color: "+ this.data('conceptColor') +"</div>";
             itemInfo.document.write("<html><body><b><u>Node details</u></b><br/>"+ nodeInfo +"</body></html>");*/
             console.log("Item Info. command selected; nodeID: "+ this.id());
             $("#itemInfoDialogBox").dialog();
             var nodeInfo= "Concept Type: "+ this.data('conceptType') +"<br/> Value: "+ this.data('value') +
                     "<br/> <br/><u>Properties:</u> <br/> id: "+ this.id() +"<br/> Shape: "+ this.data('conceptShape') +
                     "<br/> Color: "+ this.data('conceptColor');
             $("#itemInfoDialogBox").html(nodeInfo);
            }
        }
    ], 

    fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    activeFillColor: 'rgba(92, 194, 237, 0.75)', // the colour used to indicate the selected command
    activePadding: 2, // 20, // additional size in pixels for the active command
    indicatorSize: 15, // 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 3, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 5, // 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 10, // 38, // the maximum radius in pixels of the spotlight
    itemColor: 'white', // the colour of text in the command's content
    itemTextShadowColor: 'black', // the text shadow colour of the command's content
    zIndex: 9999 // the z-index of the ui div
};

cy.cxtmenu(circularNodeContextMenu); // set Context Menu for Nodes.

// Popup (context) menu: a circular Context Menu for each Edge arrow (relation) using the 'cxtmenu' jQuery plugin.
var circularEdgeContextMenu= {
    menuRadius: 50, // 70, // 100, // the radius of the circular menu in pixels
    selector: 'edge', // elements matching this Cytoscape.js selector will trigger cxtmenus
    commands: [ // an array of commands to list in the menu
        {
         content: 'Hide',
         select: function() {
             console.log("Hide command selected; nodeID: "+ this.id());
             this.hide(); // hide the selected 'edge' element.
            }
        },
            
        {
         content: 'Show All',
         select: function() {
             console.log("Show command selected; nodeID: "+ this.id());
             cy.elements('node').show(); // show all nodes.
             cy.elements('edge').show(); // show all edges
            }
        }
    ], 

    fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    activeFillColor: 'rgba(92, 194, 237, 0.75)', // the colour used to indicate the selected command
    activePadding: 2, // 20, // additional size in pixels for the active command
    indicatorSize: 15, // 24, // the size in pixels of the pointer to the active command
    separatorWidth: 3, // the empty spacing in pixels between successive commands
    spotlightPadding: 3, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 5, // 24, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 10, // 38, // the maximum radius in pixels of the spotlight
    itemColor: 'white', // the colour of text in the command's content
    itemTextShadowColor: 'black', // the text shadow colour of the command's content
    zIndex: 9999 // the z-index of the ui div
};

cy.cxtmenu(circularEdgeContextMenu); // set Context Menu for Edges.

// Popup (context) menu: created as a wrapper extension using a <div> element and the JQuery UI context menu plugin.
/*cy.cytoscape('collection', 'menu', function(options){
   var node = this;
   var cy = this.cy();   
   var $container = $( cy.container() );
   var $div = $('<div style="z-index: -1;"></div>');

   $container.append( $div );
   $div.menu( options ); // options: the popup menu options

   return this; // chaining
 });
*/

/*
 // JQuery Context Menu plugin.
 $.contextMenu({
// $('#cy').contextMenu({
// cy.elements('node').contextMenu({
   selector: '#cy', 
   callback: function(key, options) {
    var msg= "Clicked: " + key + " on " + $(this).text();
    console.log(msg); 
   },
   items: {
       "cxtChange": {name: "Change"},
       "cxtHide": {name: "Hide"},
       "sep1": "---------",
       "cxtShow": {
                "name": "Show", 
                "items": {
                    "cxtShow-key1": {"name": "Immediate Neighbours by concept class"},
                    "cxtShow-key2": {
                        "name": "Layouts", 
                        "items": {
                            "innerFold2-key1": {"name": "Arbor"},
                            "innerFold2-key2": {"name": "Circle"},
                            "innerFold2-key3": {"name": "Cose"}
                        }
                    },
                    "cxtShow-key3": {"name": "Immediate Neighbourhood"},
                    "cxtShow-key4": {"name": "Relations to other visible concepts"}
                }
            },
      }
  });
*/

// Switch to Arbor layout (a force-directed physics simulation similar to the Kamada Kawai layout in QTLNetMiner).
var arborOptions= {
  name: 'arbor',

  animate: true, // whether to show the layout as it's running
  maxSimulationTime: 5000, // max length in ms to run the layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout

  // callbacks on layout events
  ready: undefined, // callback on layoutready 
  stop: undefined, // callback on layoutstop

  // forces used by arbor (use arbor default on undefined)
  repulsion: undefined,
  stiffness: undefined,
  friction: undefined,
  gravity: true,
  fps: undefined,
  precision: undefined,

  // static numbers or functions that dynamically return what these
  // values should be for each element
  // e.g. nodeMass: function(n){ return n.data('weight') }
  nodeMass: undefined, 
  edgeLength: undefined,

  stepSize: 0.1, // smoothing of arbor bounding box

  // function that returns true if the system is stable to indicate
  // that the layout can be stopped
  stableEnergy: function( energy ){
    var e = energy; 
    return (e.max <= 0.5) || (e.mean <= 0.3);
  },

  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
};

 cy.layout(arborOptions); // set Arbor Layout.

 // Show the Item Info. window.
/* $('#itemInfo').click(function() {
   $('#itemInfo').slideToggle(300);
  });*/
}); // on dom ready
