@author Ajit Singh [Rothamsted]

@descripion A network view example implemented using CytoscapeJS along with its cxtmenu plugin, JQuery UI, Qtip, event handlers and layout libraries such as CoLa, Arbor, dagre, springy & CoSE. The example illustrates key features of cytoscapeJS for network view such as:

1) Nodes (concepts) and Edges (relations) using custom data, shape, size and colour
2) CoLa layout (a force-directed layout using the CoLa algorithm, similar to the Gem layout in Ondex Web).
3) A circular context menu using the cytoscape cxtmenu plugin. [Radial Sub-menus added to cxtmenu plugin in Dec. 2014, will be added to this example soon]
4) Event handling on node and edge elemnts.
5) Show all/ hide elements (nodes or edges).
6) Selecting multiple elements using Shift + click. The selections made can be displayed via the context menu --> "Show selections" which shows a list of all the selected elements in a JQuery UI dialog.
7) Panning (dragging) the entire network via a mouse drag event.
8) Item Info. dialog pop up upon clicking a node or edge and selecting "Item Info." from the circular context menu.
& more.
9) All nodes & edges data is retrieved from a file containing data in JSON format in multiple JSON objects.
