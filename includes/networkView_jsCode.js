/**
 * @author Ajit Singh
 * @name Network View example
 * @description example code for Network View using Javascript, jQuery, CytoscapeJS, JQuery UI, cxtmenu, QTip, 
 * multi-select (using Shift + click), CoLa.js & JSON.
 * @returns
 **/

  /** Define the default layout for the network, using CoLa layout from Cola.js (similar to the "Gem" layout in 
    * Ondex Web). */
   var defaultNetworkLayout= {
    name: 'cola', // CoLa layout, using Cola.v3.min.js & Cola.adaptor.js (Ondex Web: Gem)
    animate: true, // false, 
    animationDuration: 500, 
    fit: true, padding: 10, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 8000, // 5000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // layout event callbacks
    ready: function() {}, // on layoutready
    stop: function() {}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true,
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    nodeSpacing: function( node ){ return 10; }, // for extra spacing around nodes
    flow: undefined, // use DAG/ tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
    // different methods of specifying edge length, each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation
    // iterations of the cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
    // infinite layout options
    infinite: false // overrides all other options for a forces-all-the-time mode
   };

// On startup
$(function() { // on dom ready
//  var networkJSON= JSON.parse(graphJSON); // to parse JSON object containing node and edge data.
//  var networkJSON= JSON.stringify(graphJSON); // if already parsed, to convert the JSON object to String.
  var networkJSON= graphJSON; // using the JSON object directly

  /* Fetch JSON data from the relevant QTLNetMiner server using JQuery and Ajax instead of directly using 
   * the example JSON file (networkGraph.json). This data is located on the QTLNetMiner servers under 
   * /var/www/html/{organism}_data/ and can be accessed via the url below. */
  var data_url = "https://ondex.rothamsted.ac.uk/poplar_data/";
  // For testing via the QTLNetMiner test server, use:
  //  var data_url = "https://qtlnetminer-test.rothamsted.ac.uk/poplar_data/";

  var jsonFile= "result_1424791328834.json"; // hard-coded for now, retrieve file name from 
  var jsonUrl= data_url + jsonFile; // using data_url from utils-config.js and json file name.

/*  $.getJSON(jsonUrl, function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "new-json-data-list",
    html: items.join( "" )
   }).appendTo( "body" );
  }
   // success handler.
   
  );*/
    

  // Display 'networkJSON' elements.nodes data in console.
/*  for(var j = 0; j < networkJSON.nodes.length; j++){
      var anno= networkJSON.nodes[j].data.annotation;
      if (anno.length>15) {
          anno= anno.substring(0,15) +"..."; 
         }
      console.log("JSON node.data (id, type, conceptColor, shape, visibleDisplay, value, annotation, pid): "+ 
              networkJSON.nodes[j].data.id +", "+ networkJSON.nodes[j].data.conceptType +", "+ 
              networkJSON.nodes[j].data.conceptColor +", "+ networkJSON.nodes[j].data.conceptShape +", "+ 
              networkJSON.nodes[j].data.visibleDisplay +", "+ networkJSON.nodes[j].data.value +", "+ 
              anno +", "+ networkJSON.nodes[j].data.pid);
     }
 
  console.log("\n \n");
  for(var k = 0; k < networkJSON.edges.length; k++){
      console.log("JSON edge.data (id, source, target, edgeColor, label): "+ 
              networkJSON.edges[k].data.id +", "+ networkJSON.edges[k].data.source +", "+ 
              networkJSON.edges[k].data.target +", "+ networkJSON.edges[k].data.edgeColor +", "+ networkJSON.edges[k].data.label);
     }*/

   // Define the stylesheet to be used for nodes & edges in the cytoscape.js container.
   var networkStylesheet= cytoscape.stylesheet()
      .selector('node')
        .css({
          'content': 'data(value)', // 'data(id)',
                     /*function() {
                      return this.id() +": "+ this.data('value');
                     },*/
     //     'text-valign': 'center', // to have 'content' displayed in the middle of the node.
          'outline-colour': 'black', // text outline color
          'border-style': 'solid', // node border
          'border-width': '1px',
          'font-size': '8px',
          // Set node shape, color & display (visibility) depending on settings in the JSON var.
          'shape': 'data(conceptShape)', // 'triangle',
          'width': '18px', // '22px', // '30px',
          'height': '18px', // '22px', // '30px',
          'background-color': 'data(conceptColor)',
          'display': 'data(visibleDisplay)' // display: 'element' (show) or 'none' (hide).
         })
      .selector('edge')
        .css({
          'content': 'data(label)', // label for edges (arrows).
          'font-size': '8px',
          'curve-style': 'bezier', // default. /* options: bezier, unbundled-bezier, haystack (straight edges) */
          'width': '1px', // '3px', // use mapData() mapper to allow for curved edges for inter-connected nodes.
          'line-color': 'data(edgeColor)', // 'gray',
          'line-style': 'solid', // 'solid' or 'dotted' or 'dashed'
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
        })
      .selector(':selected')
      .css({ // settings for highlight nodes in case of single click or Shift+click multi-select event.
        'border-width': '3px',
        'border-color': '#CCCC33' // '#333'
      });
      
// Initialise a cystoscape container instance as a Javascript object.
/* var cy= cytoscape({
  container: document.getElementById('cy'),
  elements: networkJSON,
  layout: defaultNetworkLayout,
  ready: function() { console.log('ready'); window.cy= this; }
});*/

// Initialise a cystoscape container instance on the HTML DOM using JQuery.
$('#cy').cytoscape({
  container: document.getElementById('cy'),

  style: networkStylesheet,

  // Using the JSON data to create the nodes.
  elements: networkJSON,
  
  // Layout of the Network.
  layout: defaultNetworkLayout,
  
  // these options hide parts of the graph during interaction.
//  hideEdgesOnViewport: true,
//  hideLabelsOnViewport: true,

  // this is an alternative that uses a bitmap during interaction.
  textureOnViewport: true,

  // interpolate on high density displays instead of increasing resolution.
  pixelRatio: 1,

  // a "motion blur" effect that increases perceived performance for little or no cost.
  motionBlur: true,
  
  // for Touch-based gestures.
//  selectionType: (isTouchDevice ? 'additive' : 'single'),
  touchTapThreshold: 8,
  desktopTapThreshold: 4,

  ready: function() {
   console.log('ready');
//   testCollections();
   window.cy= this;
  }
});

// Get the cystoscape instance as a Javascript object from JQuery.
var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

// Pan & zooms the graph to fit all the elements (concept nodes) in the graph.
//cy.fit();

// cy.boxSelectionEnabled(true); // enable box selection (highlight & select multiple elements for moving via mouse click and drag).
cy.boxSelectionEnabled(false); // to disable box selection & hence allow Panning, i.e., dragging the entire graph.

// Set requisite background image for each concept (node) instead of using cytoscapeJS shapes.
cy.nodes().forEach(function( ele ) {
  var conType= ele.data('conceptType');
  var imgName= 'Gene'; // default
  if(conType === "Biological_Process") {
     imgName= 'Bioogical_proccess';
    }
  else if(conType === "Cellular_Component") {
       imgName= 'Cellular_component';
      }
  else if(conType === "Protein Domain") {
     imgName= 'Protein_domain';
    }
  else if(conType === "Pathway") {
     imgName= 'Pathway';
    }
  else if(conType === "Reaction") {
     imgName= 'Reaction';
    }
  else if(conType === "Publication") {
     imgName= 'Publication';
    }
  else if(conType === "Protein") {
     imgName= 'Protein';
    }
  else if(conType === "Enzyme") {
     imgName= 'Enzyme';
    }
  else if(conType === "Molecular_Function") {
     imgName= 'Molecular_function';
    }
  else if(conType === "Enzyme_Classification") {
     imgName= 'Enzyme_clasification';
    }
  else if(conType === "Trait Ontology") {
     imgName= 'Trait_ontology';
    }
  else if((conType === "Compound") || (conType === "SNP")) {
     imgName= 'Compound';
    }
  else if(conType === "Phenotype") {
     imgName= 'Phenotype';
    }
  var eleImage= 'image/'+ imgName +'.png';

  // Add these properties to this element's JSON.
  ele.data('nodeImage', eleImage);

//  console.log("data.nodeImage "+ ele.data('nodeImage'));
 });

 // Update the stylesheet for the Network Graph to show background images for Nodes.
 cy.style().selector('node').css({ // Show actual background images.
           'background-image': 'data(nodeImage)',
           'background-fit': 'none' // can be 'none' (for original size), 'contain' (to fit inside node) or 'cover' (to cover the node).
          }).update();

/** Add a Qtip message to all the nodes & edges using QTip displaying their Concept Type & value when a 
 * node/ edge is clicked.
 * Note: Specify 'node' or 'edge' to bind an event to a specific type of element.
 * e.g, cy.elements('node').qtip({ }); or cy.elements('edge').qtip({ }); */
cy.elements().qtip({
  content: function() {
      var qtipMsg= "";
      try {
      if(this.isNode()) {
//         qtipMsg= "ID: "+ this.id() +", Type: "+ this.data('conceptType') +", Value: "+ this.data('value');
         qtipMsg= "Concept Type: "+ this.data('conceptType') +", Value: "+ this.data('value') +", PID: "+ 
                  this.data('pid') +"<br>"+"Annotation: "+ this.data('annotation');
        }
      else if(this.isEdge()) {
              qtipMsg= "ID: "+ this.id() +", Relation Label: "+ this.data('label');
             }
      }
      catch(err) { qtipMsg= "Selected element is neither a Concept nor a Relation"; }
      return qtipMsg;
     },
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 12,
      height: 6
    }
  }
});

/** Event handling: mouse 'tap' event on all the elements of the core (i.e., the cytoscape container).
 * Note: Specify 'node' or 'edge' to bind an event to a specific type of element.
 * e.g, cy.on('tap', 'node', function(e){ }); or cy.on('tap', 'edge', function(e){ }); */
 cy.on('tap', function(e) {
    var thisElement= e.cyTarget;
    var info= "";
    try {
    if(thisElement.isNode()) {
       info= "Concept selected: "+ thisElement.data('conceptType') +", value: "+ thisElement.data('value') +
               ", PID: "+ thisElement.data('pid');
      }
      else if(thisElement.isEdge()) {
              info= "Relation selected: id: "+ thisElement.id() +", Relation Label: "+ thisElement.data('label');
             }
      }
      catch(err) { info= "Selected element is neither a Concept nor a Relation"; }
    console.log(info);
   });

 /** Popup (context) menu: a circular Context Menu for each Node (concept) & Edge (relation) using the 'cxtmenu' jQuery plugin. */
 var contextMenu= {
    menuRadius: 75, // 100, // the radius of the circular menu in pixels

    // Use selector: '*' to set this circular Context Menu on all the elements of the core.
    /** Note: Specify selector: 'node' or 'edge' to restrict the context menu to a specific type of element. e.g, 
     * selector: 'node', // to have context menu only for nodes.
     * selector: 'edge', // to have context menu only for edges. */
    selector: '*',
    commands: [ // an array of commands to list in the menu
        {
         content: 'Item Info',
         select: function() {
/*             itemInfo= window.open("ItemInfo.html", "itemInfoWindow", 
                    "height=200, width=400, location=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, titlebar=no, directories=no, status=no");
             var nodeInfo= "<div>Concept Type: "+ this.data('conceptType') +"<br/> Value: "+ this.data('value') +
                     "<br/> <br/><u>Properties:</u> <br/> id: "+ this.id() +"<br/> Shape: "+ this.data('conceptShape') +
                     "<br/> Color: "+ this.data('conceptColor') +"</div>";
             // Show Item info. in a new window.
             itemInfo.document.write("<html><body><b><u>Node details</u></b><br/>"+ nodeInfo +"</body></html>"); */
             var itemInfo= "";
             $("#infoDialog").dialog(); // initialize a dialog box.
             try {
             if(this.isNode()) {
                itemInfo= "Concept Type: "+ this.data('conceptType') +"<br/> Value: "+ this.data('value') +
                     "<br/> <br/><u>Properties:</u> <br/> PID: "+ this.data('pid') +"<br/>Annotation: "+ 
                     this.data('annotation') +"<br/> <br/><u>Display:</u><br/> Shape: "+ this.data('conceptShape') +
                     "<br/> Color: "+ this.data('conceptColor');
               }
             else if(this.isEdge()) {
                     itemInfo= "Relation ID= "+ this.id()+ "<br/> Label: "+ this.data('label');
                    }
             }
             catch(err) { itemInfo= "Selected element is neither a Concept nor a Relation"; }
             $("#infoDialog").html(itemInfo);
            }
        },
            
        {
         content: 'Show All',
         select: function() {
             cy.elements('node').show(); // show all nodes using eles.show().
             cy.elements('edge').show(); // show all edges using eles.show().
            }
        },

        {
         content: 'Hide',
         select: function() {
             this.hide(); // hide the selected 'node' element.
            }
        },

        {
         content: 'Hide by Type',
         select: function() { // Hide all concepts (nodes) of the same type.
             var thisConceptType= this.data('conceptType');
             console.log("Hide by Type: this.Type: "+ thisConceptType);
             cy.nodes().forEach(function( ele ) {
              console.log("ele.conceptType: "+ ele.data('conceptType'));
              if(ele.data('conceptType') === thisConceptType) {
                 ele.hide();
                }
             });
            }
        },
            
/*        {
         content: 'Reset',
         select: function() {
             cy.reset(); // reset the graph's zooming & panning properties.
            }
        },*/
   /*     {
         content: 'Export JSON',
         select: function() {
             var export_json= cy.json(); // Export the graph's JSON object.
             // Export the graphJSON variable from the networkGraph.json file as a JSON object and add all 
             // the required information to make it compatible for usage with the Cytoscape desktop 
             // application.
             var json_for_cytoscape= "{ \"data\" : { \"shared_name\" : \"networkGraph_for_Cytoscape\", \"name\" : \"networkGraph\", \"selected\" : true }, \"elements\" : "+networkJSON +" }";
             // Write to file on the server.
             
             // Open new tab to allow user to download this file.
             
            }
        },*/
        {
         content: 'Show Selections',
         select: function() {
             $("#infoDialog").dialog(); // initialize a dialog box.
             // Display details of all the selected elements: nodes & edges.
             var selections= "";
//             console.log("ShowSelections (Shift+click): selections= "+ selections);
             cy.nodes().forEach(function( ele ) {
//             console.log("Reading nodes/ ele.id: "+ ele.id());
                if(ele.selected()) {
                   selections += ele.data('conceptType') +" : "+ ele.data('value') +" , PID: "+ ele.data('pid') + "<br/><br/>";
                  }
             });

             cy.edges().forEach(function( ele ) {
//             console.log("Reading edges/ ele.id: "+ ele.id());
                if(ele.selected()) {
//                   console.log("Element: Relation (edge) id= "+ ele.id() +" is "+ (ele.selected() ? 'selected':'not selected'));
                   selections += "Relation ID= "+ ele.id() +" , label: "+ ele.data('label') +"<br/>";
                  }
             });
             console.log("ShowSelections (Shift+click): selections= "+ selections);
             $("#infoDialog").html(selections);
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
    itemFontSize: 6, //8,
    zIndex: 9999 // the z-index of the ui div
 };

cy.cxtmenu(contextMenu); // set Context Menu for all the core elements.

/* // JQuery Context Menu plugin.
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
  }); */


 // Show the popup Info. dialog box.
 $('#infoDialog').click(function() {
   $('#infoDialog').slideToggle(300);
  });
  
  // Toggling between various Layout types.

  // The actual Item Info. window (<div>).
  
}); // on dom ready

  var cy= $('#cy').cytoscape('get'); // now we have a global reference to `cy`

  // Reset: Re-position the network graph.
  function resetGraph() {
   cy.reset(); // reset the graph's zooming & panning properties.
  }

  // Relayout: Set default (CoLa) layout.
  function setDefaultLayout() {
   cy.layout(defaultNetworkLayout); // run the default (CoLa) layout algorithm.
  }

  // Set Cose layout.
  /* Slow and performance-hampering */
  function setCoseLayout() {
   var coseNetworkLayout= {
    name: 'cose', // CytoscapeJS Cose layout
    animate: false /*true*/, animationDuration: 500, avoidOverlap: true, handleDisconnected: true, 
//    boundingBox: undefined, random: false, infinite: false, ready: undefined, stop: undefined, 
    roots: undefined, padding: 5 };
   cy.layout(coseNetworkLayout); // run the CoSE layout algorithm.
  }

  // Set Arbor layout.
  function setArborLayout() {
   var arborNetworkLayout= {
    name: 'arbor', // Arbor layout using Arbor.js (Ondex Web: Kamada Kawai).
    animate: true, animationDuration: 500, maxSimulationTime: 5000, fit: true, padding: 30, 
    boundingBox: undefined, ungrabifyWhileSimulating: false, ready: undefined, stop: undefined,
    avoidOverlap: true, handleDisconnected: true, 
    // forces used by arbor (use arbor default on undefined)
    repulsion: undefined, stiffness: undefined, friction: undefined, gravity: true, fps: undefined, 
    precision: undefined,
    // static numbers or functions that dynamically return what these values should be for each element
    // e.g. nodeMass: function(n){ return n.data('weight') }
    nodeMass: undefined, edgeLength: undefined,
    stepSize: 0.1, // smoothing of arbor bounding box
    // function that returns true if the system is stable to indicate that the layout can be stopped
    stableEnergy: function( energy ) {
     var e = energy; 
     return (e.max <= 0.5) || (e.mean <= 0.3);
    },
    // infinite layout options
    infinite: false
   };
   cy.layout(arborNetworkLayout); // run the Arbor layout algorithm.
  }

  // Set Springy layout.
  function setSpringyLayout() {
   var springyNetworkLayout= {
    name: 'springy', // Springy layout, uses springy.js (OndexWeb: ForceDirected).
    animate: false /*true*/, animationDuration: 500, maxSimulationTime: 1000, ungrabifyWhileSimulating: false, 
    fit: true, padding: 30, avoidOverlap: true, handleDisconnected: true, 
    boundingBox: undefined, random: false, infinite: false, ready: undefined, stop: undefined, 
    // springy forces
    stiffness: 400, repulsion: 400, damping: 0.5
   };
   cy.layout(springyNetworkLayout); // run the Springy layout algorithm.
  }

  // Set Dagre layout.
  function setTreeLayout() {
   var dagreNetworkLayout= {
    name: 'dagre', // Dagre layout, using the Ranking algorithm from dagre.js (Ondex Web: RadialTree).
    // dagre algorithm options, uses default value on undefined
    nodeSep: undefined, // the separation between adjacent nodes in the same rank
    edgeSep: undefined, // the separation between adjacent edges in the same rank
    rankSep: undefined, // the separation between adjacent nodes in the same rank
    rankDir: undefined, // 'TB' for top to bottom flow, 'LR' for left to right
    minLen: function( edge ){ return 1; }, // number of ranks to keep between the source and target of the edge
    // general layout options
    fit: true, padding: 30, animate: false, animationDuration: 500, // duration of animation in ms if enabled
    avoidOverlap: true, handleDisconnected: true, 
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    ready: function(){}, stop: function(){}
   };
   cy.layout(dagreNetworkLayout); // run the Dagre layout algorithm.
  }

  // Set Circle layout.
  function setCircleLayout() {
   var circleNetworkLayout= {
      name: 'circle', // Circle layout (Ondex Web: Circular)
      directed: true, roots: undefined, // '#n12',
      padding: 10, avoidOverlap: true, handleDisconnected: true 
   };
   cy.layout(circleNetworkLayout); // run the Circle layout.
  }

  // Set Breadthfirst layout.
  function setBreadthfirstLayout() {
   var bfNetworkLayout= {
      name: 'breadthfirst', // Breadth first layout (Ondex Web: Hierarchial)
      fit: true, directed: true, padding: 10, circle: false, boundingBox: undefined, avoidOverlap: true, 
      handleDisconnected: true, maximalAdjustments: 0, animate: false, animationDuration: 500, 
      roots: undefined, // '#n12', 
      ready: undefined, stop: undefined
   };
   cy.layout(bfNetworkLayout); // run the Breadthfirst layout.
  }

  // Set Grid layout.
  function setGridLayout() {
   var gridNetworkLayout= {
    name: 'grid', // CytoscapeJS Grid layout
    fit: true, padding: 30, boundingBox: undefined, avoidOverlap: true, handleDisconnected: true, 
    animate: false, animationDuration: 500,
    rows: undefined, // force num of rows in the grid
    columns: undefined, // force num of cols in the grid
    position: function( node ){}, // returns { row, col } for element
    ready: undefined, stop: undefined };
   cy.layout(gridNetworkLayout); // run the Grid layout.
  }

  // Search the graph for a concept using BFS: breadthfirst search
  function findConcept(conceptName) {
   console.log("Search for concept value: "+ conceptName);
   var foundID;
//   var foundElements= cy.collection(); // new Array();
   cy.nodes().forEach(function( ele ) {
       if(ele.data('visibleDisplay') === 'element') {
          if(ele.data('value').indexOf(conceptName) > -1) {
//             foundEles.add(ele); // add to collection
             console.log("Search found: "+ ele.data('value'));
             foundID= ele.id(); // the found node

//             foundElements[foundElements.length]= '#'+foundID;
//             foundElements.add(cy.$('#'+foundID));

             // select the matched concept.
             cy.$('#'+foundID).select();
            }
        }
      });
//   cy.$('#'+foundID).select();
//   foundElements.select();
  }

 // Export the graph as a JSON object in a new Tab and allow users to save it.
  function exportAsJson() {
   console.log("cy.json: ");
   console.log(cy.json());
  }
  
  // Export the graph as a .png image and allow users to save it.
  function exportAsImage() {
   // Export as .png image
   var png64= cy.png();

   // Put the png data in an img tag.
   $('#png-eg').attr('src', png64);
  }

  // Show concept neighbourhood.
  function showNeighbourhood() {
   console.log("Show neighborhood...");

   cy.nodes(':selected').neighborhood().nodes().show();
/*
   var eleID;
   var neighbourArray= new Array();
   var neighbours= cy.collection();
   // Find the selected concept 'node' element.
   cy.nodes().forEach(function( ele ) {
       if(ele.selected()) {
          eleID= ele.id();
          console.log("Show neighborhood for nodeID: "+ eleID);
         }
      });

   // Find its connected neighbours.
   cy.edges().forEach(function( edg ) {
       if(edg.data('source') === eleID) {
          neighbourArray[neighbourArray.length]= '#'+ edg.data('target');
         }
       else if(edg.data('target') === eleID) {
          neighbourArray[neighbourArray.length]= '#'+ edg.data('source');
         }
      });

   // Add the array elements to the collection.
   neighbourArray.forEach(function( eleNeighbour ) {
       console.log("Neighbour found: node "+ eleNeighbour);
     neighbours.add(eleNeighbour);
    });

   // Show neighbourhood.
   neighbours.show();
*/
  }
  
  // Show/ Hide labels for concepts and relations.
 /* function showOrHideLabels() {
   console.log("cy.hideLabelsOnViewport= "+ cy.hideLabelsOnViewport);
   if(cy.hideLabelsOnViewport === "false") {
      cy.hideLabelsOnViewport= "true";
     }
   else {
      cy.hideLabelsOnViewport= "false";
     }
  }*/

  function testCollections() {
   var n_id = cy.nodes().id();//data('pid');

   console.log( cy.nodes()[0].id() + ' == ' + n_id ); // pid is the first node ele's weight
  }