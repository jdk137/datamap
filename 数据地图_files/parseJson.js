// Scott Hale (Oxford Internet Institute)
// Requires sigma.js and jquery to be loaded
// based on parseGexf from Mathieu Jacomy @ Sciences Po Médialab & WebAtlas
sigma.publicPrototype.parseJson = function(jsonPath,callback) {
  var sigmaInstance = this;
  var edgeId = 0;
  var buColorHash = {};
  var nodeHash = {};
  //var getColor = d3.scale.category10();
  var getColor = d3.scale.ordinal().range(Aslan.color_serial());
  jQuery.getJSON(jsonPath, function(data) {
    var node;
    /*
    for (i=0; i<data.nodes.length; i++){
      node = data.nodes[i];
      node.color = getColor(node.attributes.bu);
      console.log(node.color);
      node.size = Math.pow(node.size, .8) / 2;// * Math.PI;//node.size;// * node.size * 3.14;
      node.label = node.id.split('.')[2];
      //data.nodes[i].size = Math.pow(data.nodes[i].size, 2) * Math.PI ;
      //window.NODE = data.nodes[i];//In the original, but not sure purpose
      sigmaInstance.addNode(node.id, node);
    }
    for(j=0; j<data.edges.length; j++){
      var edgeNode = data.edges[j];

      var source = edgeNode.sourceID;
      var target = edgeNode.targetID;

      sigmaInstance.addEdge(edgeId++,source,target,edgeNode);
    }
    */
    for (i=0; i<data.nodes.length; i++){
      nodeArr = data.nodes[i];
      node = {};
      node.id = nodeArr[0];
      node.x = parseFloat(nodeArr[1]);
      node.y = parseFloat(nodeArr[2]);
      node.size = Math.pow(parseFloat(nodeArr[3]), 0.8) / 2;// * Math.PI;//node.size;// * node.size * 3.14;
      node.color = getColor(nodeArr[4]);
      node.label = node.id.split('.')[2];
      node.bu = data.bu_lines[nodeArr[4]];
      sigmaInstance.addNode(node.id, node);
      nodeHash[node.id] = node;
      /*
      if (!data.bu_lines[nodeArr[4]]) {
        console.log(nodeArr);
      }
      if (nodeArr[4] === '0' || nodeArr[4] === 0 ) {
        console.log(nodeArr);
      }
      */
      buColorHash[node.bu] = node.color;
    }
    for(j=0; j<data.edges.length; j++){
      var edgeArr = data.edges[j];

      var source = data.nodes[edgeArr[0]][0];
      var target = data.nodes[edgeArr[1]][0];
      var edgeNode = {
        sourceNode: nodeHash[source],
        targetNode: nodeHash[target],
        sourceID: source,
        targetID: target,
        size: 1
      };
      sigmaInstance.addEdge(edgeId++, source, target, edgeNode);
    }

    // set real data number
    //queryParam.limit = data.nodes.length;
    //$(".data-number").val(queryParam.limit);

    // create legend
    var html = "";
    var maxHeight = $("#sig").height() - 80;
    data.bu_lines.forEach(function (d) {
      if (!buColorHash[d]) {
        return;
      }
      html += '<p style="line-height: 50%; cursor: pointer;"><span style="display: inline-block; margin-right: 4px; width: 12px; padding-top: 3px; background-color: ' + buColorHash[d] + ';">&nbsp;</span>' +
        '<span class="bu-name" style="color: #ccc;">' + d + '</span></p>';
    });
    var legend = $("#legend");
    legend.html(html);
    var realHeight = $("#legend").height();
    console.log(realHeight);
    var topMargin = $("#sig").height() - Math.min($("#legend").height(), maxHeight) - 50;
    legend.css({
      position: "absolute",
      top: topMargin,
      right: "15px",
      //"background-color": "#999",
      opacity: 0.75,
      border: "1px solid #333",
      "border-radius": "15px",
      "padding": "10px",
      "margin": "5px",
      "z-index": 500
    });
    /*
    $("#legend").css({
      "max-height": maxHeight,
      "overflow-y": "auto",
      "overflow-x": "hidden"
    });
  */
    legend.on("mouseover", ".bu-name", function () {
      $(this).css({'color': "#fff"});
    });
    legend.on("mouseout", ".bu-name", function () {
      $(this).css({'color': "#ccc"});
    });
    legend.on("click", ".bu-name", function () {
      console.log($(this).html());
      visgexf.highlightBu($(this).html());
    });

    var legendSlider = $("#legend-slider");

    legendSlider.html('&#8743;').css({
      position: "absolute",
      top: 4,
      right: "15px",
      height: 20,
      width: $("#legend").width() + 22,
      //"background-color": "#999",
      opacity: 0.75,
      border: "1px solid #333",
      "background-color": "#444",
      "border-radius": "3px",
      "padding": "0px",
      "margin": "5px",
      "text-align": "center",
      "color": "#fff",
      "cursor": "pointer",
      "z-index": 600
    });

    legendSlider.on("mouseover", function () {
      $(this).css({'opacity': 1});
    });
    legendSlider.on("mouseout", function () {
      $(this).css({'opacity': 0.75});
    });
    legendSlider.on("click", (function () {
      var state = "show"; // show or hidden
      return function () {
        if (state === 'show') {
          legend.animate({
            height: 0
          }, 500, function () {
            legend.hide();
            legendSlider.html('&#8744;');
          });
          state = 'hidden';
        } else {

          legend.css({height: 0}).show().animate({
            height: realHeight
          }, 500, function () {
            legendSlider.html('&#8743;');
          });
          state = 'show';
        }
      };
    }()));

    if (callback) callback.call(this);//Trigger the data ready function
  });//end jquery getJSON function
};//end sigma.parseJson function
