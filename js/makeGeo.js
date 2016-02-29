var h = 800;
var w = 900;


var svg = d3.select("#wc").append("svg")
.attr({
	"width": w,
	"height": h
})


makeGeo("kurashiki2.geojson");

function makeGeo(file) {
	// 地理座標から画面表示への投影法の設定。
	var mercator = d3.geo.mercator()
	.center([133.746748, 34.556963])
	.translate([w/2, h/2-100])
	.scale(125000);

	// geojsonからpath要素を作るための設定。
	var geopath = d3.geo.path()
	.projection(mercator);


	d3.json(file, function(error, kurashiki) {
		console.log(kurashiki);
		svg.attr({
			"x":0,
			"y":0,
			"width":w,
			"height":h
		})
		.append("g")
		.attr("fill", "rgba(0,0,0,0.5)")
		.selectAll("path")
		.data(kurashiki.features) // geojsonのすべての県の座標データを読み込む。
		.enter().append("path")
		.attr("d", geopath); // geojsonからpath要素に変換する。// idがないので、各県の座標リストに基づいて色を変える。

	});

}
