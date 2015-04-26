//var gexf = testData;
//var gexf = './../../data/datamap/mini.json';
//var gexf = './../../data/datamap/npmdepgraph.min10.json';
//var gexf = '/test/npm/npmdepgraph.json';

//var gexf = '/dataMap/get?limit=' + queryParam.limit;
var gexf = './数据地图_files/30000.json';
if (queryParam.keywords) {
  gexf += '&keywords=' + escape(queryParam.keywords);
}
//var param = Aslan.parseParam(location.search);
//alert(param);

$(function(){
  global.defaultProps = {
    drawing: {
      defaultLabelColor: '#fff',
      defaultLabelSize: 12,
      defaultLabelBGColor: '#fff',
      defaultLabelHoverColor: '#000',
      labelThreshold: 6,//3
      defaultEdgeType: 'curve'
    },
    graph: {
      minNodeSize: 0.05,
      maxNodeSize: 12.5,
      minEdgeSize: 0.15,
      maxEdgeSize: 0.3
    },
    forceLabel: 1,
    type: 'directed'
  };

  visgexf.init('sig', gexf, global.defaultProps, function() {
    checkLine();
  });
});
