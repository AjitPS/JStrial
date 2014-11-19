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
        { data: { id: 'n1', value: 'AT5G4893i' , conceptType: 'gene', conceptShape: 'triangle', conceptColor: 'cyan' } },
        { data: { id: 'n2', value: 'AT5G1470i' , conceptType: 'gene', conceptShape: 'triangle', conceptColor: 'cyan' } },
        { data: { id: 'n3', value: 'Lignin formation' , conceptType: 'compound', conceptShape: 'heptagon', conceptColor: 'teal' } },
        { data: { id: 'n4', value: 'Lignin content' , conceptType: 'traitOntology', conceptShape: 'pentagon', conceptColor: 'yellow' } },
        { data: { id: 'n5', value: 'PMID:17237352' , conceptType: 'publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n6', value: 'PMID:15161961' , conceptType: 'publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n7', value: 'PMID:17163881' , conceptType: 'publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n8', value: 'PMID:20511296' , conceptType: 'publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n9', value: 'PMID:21251001' , conceptType: 'publication', conceptShape: 'rectangle', conceptColor: 'orange' } },
        { data: { id: 'n10', value: 'AT5G1470' , conceptType: 'protein', conceptShape: 'circle', conceptColor: 'red' } },
        { data: { id: 'n11', value: 'POPTR_0001s3488i' , conceptType: 'protein', conceptShape: 'circle', conceptColor: 'red' } },
        { data: { id: 'n12', value: 'POPTR_0001s3488i' , conceptType: 'gene', conceptShape: 'triangle', conceptColor: 'cyan' } },
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
        { data: { id: 'n12n11', source: 'n12', target: 'n11' } },
        { data: { id: 'n11n10', source: 'n11', target: 'n10' } },
      ]
    };

// Display 'geneJSON' elements.nodes data in console.
for (var j = 0; j < geneJSON.nodes.length; j++){
     console.log("JSON node.data (id, value, conceptType, conceptShape, conceptColor): "+ geneJSON.nodes[j].data.id +" , "+ 
             geneJSON.nodes[j].data.value +" , "+ geneJSON.nodes[j].data.conceptType +" , "+ 
             geneJSON.nodes[j].data.conceptShape +" , "+ geneJSON.nodes[j].data.conceptColor);
    }
      
// $('#cy').cytoscape({
 var cy= cytoscape({
  container: document.getElementById('cy'),

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(value)',
        'outline-colour': 'black',
        'font-size': '8px',
        'border-style': 'solid', // node border
        'border-width': '1px',
        // Set node shape & color depending on node type (read 'type' from JSON).
        'shape': 'triangle', // 'data(conceptShape)',
        'width': '20px',
        'height': '20px',
        'background-color': 'data(conceptColor)'
       })
    .selector('edge')
      .css({
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
/*    name: 'breadthfirst', // Breadth first layout example
    directed: true,
    roots: '#n12',
    padding: 10*/

/*    name: 'cose', // Cose layout example
    padding: 5*/

    name: 'circle', // Circle layout
    directed: true,
    roots: '#n12',
    padding: 10
  }
});

/*
// Add a generic Qtip message to all the nodes using QTip.
cy.elements('node').qtip({
  content: this.data('type') +": "+ this.data('value'),
//  content: 'data(type)',// this.data('type'), // +': '+ this.data('value'),
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 12,
      height: 8
    }
  }
});*/

// Event handling: mouseover event.
//var cy= $('#cy');
cy.on('mouseover', 'node', function(e){
      var thisNode= e.cyTarget;
      var nodeDetails= thisNode.data('conceptType') +": "+ thisNode.data('value');
      console.log("Current node: "+ nodeDetails);
      // Instead of a console message, display this in Qtip.
    });

// Add a generic popup menu to all the nodes using a jQuery UI wrapper extension.
/* cytoscape('collection', 'menu', function(options){
   var node = this;
   var cy = this.cy();   
   var $container = $( cy.container() );
   var $div = $('<div style="z-index: -1;"></div>');

   $container.append( $div );
   $div.menu( options ); // or something similar

   return this; // chaining
 });*/

/*
// Node Highlighting.
var bfs = cy.elements().bfs('#n1', function(){}, true);
var bfs2 = cy.elements().bfs('#n12', function(){}, true);

var i = 0;
var j = 0;
var highlightNextEle = function(){
  bfs.path[i].addClass('highlighted');
  
  if( i < bfs.path.length ){
    i++;
    setTimeout(highlightNextEle, 2000);
  }

  // Highlight all 'l' elements too.
  bfs2.path[j].addClass('highlighted');
  
  if( j < bfs2.path.length ){
    j++;
    setTimeout(highlightNextEle, 2000);
  }
};

// kick off first highlight
highlightNextEle();
*/

// Switch to Arbor layout (a force-directed physics simulation similar to the Kamada Kawai layout in QTLNetMiner).
var arborOptions = {
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
//$('#cy').layout(arborOptions);

}); // on dom ready
