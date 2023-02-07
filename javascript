//javascript code
function init() {
      const $ = go.GraphObject.make;  
      myDiagram =$(go.Diagram, "myDiagramDiv", 
          {
            allowDelete: false,
            allowCopy: false,
            layout: $(go.ForceDirectedLayout),
            "undoManager.isEnabled": true
          });
      var colors = {
        'red': '#be4b15',
        'green': '#52ce60',
        'blue': '#6ea5f8',
        'lightred': '#fd8852',
        'lightblue': '#afd4fe',
        'lightgreen': '#b9e986',
        'pink': '#faadc1',
        'purple': '#d689ff',
        'orange': '#fdb400',
      }

      var itemTempl =
        $(go.Panel, "Horizontal",
          $(go.Shape,
            { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
            new go.Binding("figure", "figure"),
            new go.Binding("fill", "color"),
            new go.Binding("stroke", "color")),
          $(go.TextBlock,
            {
              stroke: "#333333",
              font: "bold 14px sans-serif"
            },
            new go.Binding("text", "name"))
        );
      myDiagram.nodeTemplate = $( go.Node, "Auto", 
          {
            selectionAdorned: true,
            resizable: true,
            layoutConditions: go.Part.LayoutStandard & new go.Part.LayoutNodeSized,
            fromSpot : go.Spot.AllSides,
            toSpot:new go.Spot.AllSides,
            isShadowed: true,
            shadowOffset: new go.Point(3, 3),
            shadowColor: "#C5C1AA"
          },
          new go.Binding("location", "location").makeTwoWay(),
          // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
          // clear out any desiredSize set by the ResizingTool.
          new go.Binding("desiredSize", "visible", v => new go.Size(NaN, NaN)).ofObject("LIST"),
          // define the node's outer shape, which will surround the Table
          $(go.Shape, "RoundedRectangle",
            { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
          $(go.Panel, "Table",
            { margin: 8, stretch: go.GraphObject.Fill },
            $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
            // the table header
            $(go.TextBlock,
              {
                row: 0, alignment: go.Spot.Center,
                margin: new go.Margin(0, 24, 0, 4),  
                font: "bold 16px sans-serif"
              },
              new go.Binding("text", "key")),
            $("PanelExpanderButton", "LIST",  
              { row: 0, alignment: go.Spot.TopRight }),
           
            $(go.Panel, "Vertical",
              {
                name: "LIST",
                row: 1,
                padding: 3,
                alignment: go.Spot.TopLeft,
                defaultAlignment: go.Spot.Left,
                stretch: go.GraphObject.Horizontal,
                itemTemplate: itemTempl
              },
              new go.Binding("itemArray", "items"))
          )  
        );  
      myDiagram.linkTemplate =
        $(go.Link,  
          {
            selectionAdorned: false,
            layerName: "Foreground",
            reshapable: false,
            routing: go.Link.AvoidsNodes,
            corner: 5,
            curve: go.Link.JumpOver
          },
          $(go.Shape, 
            { stroke: "#303B45", strokeWidth: 2.5 }),
          $(go.TextBlock,  
            {
              textAlign: "center",
              font: "bold 14px sans-serif",
              stroke: "#1967B3",
              segmentIndex: 0,
              segmentOffset: new go.Point(NaN,NaN),
              segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding("text","text")),
          $(go.TextBlock, 
            {
              textAlign: "center",
              font: "bold 14px sans-serif",
              stroke: "#1967B3",
              segmentIndex: -1,
              segmentOffset: new go.Point(NaN, NaN),
              segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding("text", "toText"))
        );
      var nodeDataArray = [
        {
          key: "Products",
          items: [{ name: "AddressID", iskey: true, figure: "Decision", color: colors.red }, 
          { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
        },
        {
          key: "StreetNumber",
          items : [{ name: "StreetNumber", iskey: true, figure: "Decision", color: colors.red },
          { name: "StreetName", iskey: false, figure: "dragon", color: colors.blue },
          { name: "City", iskey: false, figure: "Hexagon", color: colors.blue },
          { name: "Address", iskey: false, figure: "Hexagon", color: colors.blue }]
        },
        {
          key: "StateProvideID",
          items: [{ name: "StateProvideID", iskey: true, figure: "Decision", color: colors.red },
          { name: "CategoryName", iskey: false, figure: "Hexagon", color: colors.blue },
          { name: "Description", iskey: false, figure: "Hexagon", color: colors.blue },
          { name: "Picture", iskey: false, figure: "TriangleUp", color: colors.pink }]
        },
        {
          key: "PostalCode",
          items: [{ name: "PostalCode", iskey: true, figure: "Decision", color: colors.red },
          { name: "PostalCode", iskey: true, figure: "Decision", color: colors.red },
          { name: "PostalCode", iskey: false, figure: "Circle", color: colors.green },
          { name: "Quantity", iskey: false, figure: "Circle", color: colors.green },
          { name: "Discount", iskey: false, figure: "Circle", color: colors.green }]
        }
      ];
      var linkDataArray = [
        { from: "AddressID", to: "StreetNum", text: "0..N", toText: "1" },
        { from: "AddressID", to: "StreetNum", text: "0..N", toText: "1" }
      myDiagram.model = go.GraphLinksModel
        {
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray: nodeDataArray,
          linkDataArray: linkDataArray
        };
    }
    window.addEventListener('DOMContentLoaded', init);
