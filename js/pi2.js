
var chart1 = [6,12];
var chart2 = [14,4];
var chart3 = [20, 16];

// 県内データ
var man = [4, 4];
var woman = [6, 0];
var all = [10, 4];
// 県外データ
var n_man = [2, 8];
var n_woman = [8, 4];
var n_all = [10, 12]



var text = [{"text":"男性", "p":1, "id":"chart1"}, {"text":"女性", "p":2, "id":"chart2"}, {"text":"全体", "p":0, "id":"chart3"}];


var rectdata = ["Yes","No"];

var width = 700;
var height = 600;

var radius = Math.min(width, height) / 2 - 10;

var outerRadius = radius - 10;
var innerRadius = radius - 170;

var color = d3.scale.linear()
.domain([0,d3.map(man).size()-1])
.range(["#007bbb","#b94047"]);

var pie = d3.layout.pie().value(function(d) {
  return d;
}).sort(null);



var a_scale = d3.scale.linear()
.domain([0, d3.sum(chart3)])
.rangeRound([0, 100]);
var m_scale = d3.scale.linear()
.domain([0, d3.sum(chart1)])
.rangeRound([0, 100]);
var w_scale = d3.scale.linear()
.domain([0, d3.sum(chart2)])
.rangeRound([0, 100]);
// 県内用スケール
var y_a_scale = d3.scale.linear()
.domain([0, d3.sum(all)])
.rangeRound([0, 100]);
var y_m_scale = d3.scale.linear()
.domain([0, d3.sum(man)])
.rangeRound([0, 100]);
var y_w_scale = d3.scale.linear()
.domain([0, d3.sum(woman)])
.rangeRound([0, 100]);
// 県外用スケール
var n_a_scale = d3.scale.linear()
.domain([0, d3.sum(n_all)])
.rangeRound([0, 100]);
var n_m_scale = d3.scale.linear()
.domain([0, d3.sum(n_man)])
.rangeRound([0, 100]);
var n_w_scale = d3.scale.linear()
.domain([0, d3.sum(n_woman)])
.rangeRound([0, 100]);


var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

var svg = d3.select("#pi")
.append("svg")
.attr("width", width).attr("height", height);

var a = svg.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = a
.selectAll("path")
.data(pie(chart3))
.enter()
.append("g");

g.append("path")
.attr("fill", function(d, i) {
  return color(i);
})
.attr("stroke", "white")
.attr("stroke-width", 5)
.attr("d", arc)
.each(function(d) {
  this._current = d;
});

g.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
.attr("font-size", "30")
.attr("fill","white")
.style("text-anchor", "middle")
.text(function(d) {return a_scale(d.data) + "%"; })
.each(function(d) {
  this._current = d;
});

var c_text = svg
.append("g")
.attr("class","c-text")
.attr("transform","translate(" + width/2 + "," + height/2 + ")")
.style("cursor","pointer");

var num = svg
.append("g")
.attr("class","num")
.attr("transform","translate(" + width/2 + "," + height/2 + ")");

num.append("text")
.attr({
  "id": "Yes",
  "text-anchor": "middle",
  "font-size": 25,
  "y": 40
})

num.append("text")
.attr({
  "id": "No",
  "text-anchor": "middle",
  "font-size": 25,
  "y": 65
})

num.append("text")
.attr({
  "id": "sum",
  "text-anchor": "middle",
  "font-size": 25,
  "y": 90
})



c_text.selectAll("text")
.data(text).enter()
.append("text")
.attr("id", function(d){return d["id"];})
.attr("text-anchor","middle")
.attr("font-size", function(d) {
  if(d["p"] == 0){
    return 40;
  }
  return 20;
})
.attr("x", function(d) {
  if(d["p"] == 0){
    return 0;
  } else if(d["p"] == 1) {
    return -50;
  }
  return 50;
})
.attr("y", function(d) {
  if(d["p"] == 0){
    return -40;
  }
  return -5;
})
.attr("fill", function(d) {
  if(d["p"] == 0){
    return "rgba(0,0,0,1)";
  }
  return "rgba(0,0,0,0.5)";
})
.text(function(d){return d["text"];});

ChangeNum(chart3);

var c_frag = [0, 0];
var c_data = svg.append("g")
.attr({
  "id": "c_data",
  "transform": "translate(0, 600)"
})

c_data.append("text")
.on("mouseover", function() {
  if(c_frag[0] == 0){
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":40,
      "fill":"rgba(0,0,0,1)"
    });
  }
})
.on("mouseout", function() {
  if(c_frag[0] == 0){
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":30,
      "fill":"rgba(0,0,0,0.5)"
    });
  }
})
.on("click", function() {
  if(c_frag[0] == 0){
    if(c_frag[1] == 1){
      c_frag[1] = 0;
      d3.select("#gai")
      .transition()
      .duration(150)
      .attr({
        "font-size":30,
        "fill":"rgba(0,0,0,0.5)"
      });
    }
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":40,
      "fill":"rgba(0,0,0,1)"
    });

    c_frag[0] = 1;
    if(text[0]["p"]==0){
      arcAnime(man,0);
      ChangeNum(man);
    }else if(text[1]["p"]==0){
      arcAnime(woman,1);
      ChangeNum(woman);
    }else{
      arcAnime(all,2);
      ChangeNum(all);
    }
  }else{
    c_frag[0] = 0;
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":30,
      "fill":"rgba(0,0,0,0.5)"
    });
    if(text[0]["p"]==0){
      arcAnime(chart1,0);
      ChangeNum(chart1);
    }else if(text[1]["p"]==0){
      arcAnime(chart2,1);
      ChangeNum(chart2);
    }else{
      arcAnime(chart3,2);
      ChangeNum(chart3);
    }
  }
})
.attr({
  "id":"nai",
  "x":50,
  "y":-40,
  "text-anchor": "middle",
  "font-size":30,
  "fill": "rgba(0,0,0,0.5)"
})
.style("cursor","pointer")
.text("県内");

c_data.append("text")
.on("mouseover", function() {
  if(c_frag[1] == 0){
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":40,
      "fill":"rgba(0,0,0,1)"
    });
  }
})
.on("mouseout", function() {
  if(c_frag[1] == 0){
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":30,
      "fill":"rgba(0,0,0,0.5)"
    });
  }
})
.on("click", function() {
  if(c_frag[1] == 0){
    if(c_frag[0] == 1){
      c_frag[0] = 0;
      d3.select("#nai")
      .transition()
      .duration(150)
      .attr({
        "font-size":30,
        "fill":"rgba(0,0,0,0.5)"
      });
    }
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":40,
      "fill":"rgba(0,0,0,1)"
    });

    c_frag[1] = 1;
    if(text[0]["p"]==0){
      arcAnime(n_man,0);
      ChangeNum(n_man);
    }else if(text[1]["p"]==0){
      arcAnime(n_woman,1);
      ChangeNum(n_woman);
    }else{
      arcAnime(n_all,2);
      ChangeNum(n_all);
    }
  }else{
    c_frag[1] = 0;
    d3.select(this)
    .transition()
    .duration(150)
    .attr({
      "font-size":30,
      "fill":"rgba(0,0,0,0.5)"
    });
    if(text[0]["p"]==0){
      arcAnime(chart1,0);
      ChangeNum(chart1);
    }else if(text[1]["p"]==0){
      arcAnime(chart2,1);
      ChangeNum(chart2);
    }else{
      arcAnime(chart3,2);
      ChangeNum(chart3);
    }
  }
})
.attr({
  "id":"gai",
  "x":50,
  "y":-0,
  "text-anchor": "middle",
  "font-size":30,
  "fill": "rgba(0,0,0,0.5)"
})
.style("cursor","pointer")
.text("県外");




d3.select("#chart1").on("click",function (){
  if(c_frag[0] == 1){
    arcAnime(man, 0);
    ChangeNum(man);
  } else if(c_frag[1] == 1){
    arcAnime(n_man, 0);
    ChangeNum(n_man);
  } else {
    arcAnime(chart1, 0);
    ChangeNum(chart1);
  }

  if(text[0]["p"]==1){
    cycleRight("#chart1");
  } else if(text[0]["p"]==2) {
    cycleLeft("#chart1");
  }
} , false);
d3.select("#chart2").on("click",function (){
  if(c_frag[0] == 1){
    arcAnime(woman, 1);
    ChangeNum(woman);
  } else if(c_frag[1] == 1){
    arcAnime(n_woman, 1);
    ChangeNum(n_woman);
  } else {
    arcAnime(chart2, 1);
    ChangeNum(chart2);
  }

  if(text[1]["p"]==1){
    cycleRight("#chart2");
  } else if(text[1]["p"]==2) {
    cycleLeft("#chart2");
  }
} , false);
d3.select("#chart3").on("click",function (){
  if(c_frag[0] == 1){
    arcAnime(all, 2);
    ChangeNum(all);
  } else if(c_frag[1] == 1){
    arcAnime(n_all, 2);
    ChangeNum(n_all);
  } else {
    arcAnime(chart3, 2);
    ChangeNum(chart3);
  }

  if(text[2]["p"]==1){
    cycleRight("#chart3");
  } else if(text[2]["p"]==2) {
    cycleLeft("#chart3");
  }
} , false);


var rectg = svg.append("g")
.attr("class","rect")
.attr("transform","translate(600,600)");



var tag = rectg.selectAll("rect")
.data(rectdata).enter()
.append("rect")
.attr({
  "x":0,
  "y":function(d,i) { return -1*(d3.map(rectdata).size()-i)*30;},
  "width":"40",
  "height":"25",
  "fill":function(d, i){ return color(i);}
});

var tagtext = rectg.selectAll("text")
.data(rectdata).enter()
.append("text")
.attr({
  "x":41,
  "y":function(d,i) {return -1*(d3.map(rectdata).size()-i)*30+25; },
  "font-size":25
})
.text(function(d){ return d;});


function cycleRight(type){
  svg.select(type)
  .transition()
  .duration(1000)
  .ease("elastic", 1, 0.8)
  .attr({
    "x": 0,
    "y": -40,
    "font-size": 40,
    "fill": "rgba(0,0,0,1)"
  });

  if(type=="#chart1") {
    svg.select("#chart2")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": -50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#chart3")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": 50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=0;
    text[1]["p"]=1;
    text[2]["p"]=2;
  }else if(type=="#chart2") {
    svg.select("#chart3")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": -50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#chart1")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": 50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=2;
    text[1]["p"]=0;
    text[2]["p"]=1;
  } else {
    svg.select("#chart1")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": -50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#chart2")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": 50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=1;
    text[1]["p"]=2;
    text[2]["p"]=0;
  }
}


function cycleLeft(type){
  svg.select(type)
  .transition()
  .duration(1000)
  .ease("elastic", 1, 0.8)
  .attr({
    "x": 0,
    "y": -40,
    "font-size": 40,
    "fill": "rgba(0,0,0,1)"
  });

  if(type=="#chart1") {
    svg.select("#chart2")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": -50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#chart3")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": 50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=0;
    text[1]["p"]=1;
    text[2]["p"]=2;
  }else if(type=="#chart2") {
    svg.select("#chart3")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": -50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#chart1")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": 50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=2;
    text[1]["p"]=0;
    text[2]["p"]=1;
  } else {
    svg.select("#chart1")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": -50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });

    svg.select("#chart2")
    .transition()
    .duration(1000)
    .ease("elastic", 1, 0.8)
    .attr({
      "x": 50,
      "y": -5,
      "font-size": 20,
      "fill": "rgba(0,0,0,0.5)"
    });
    text[0]["p"]=1;
    text[1]["p"]=2;
    text[2]["p"]=0;
  }
}

function ChangeNum(chart) {
  d3.select("#Yes")
  .text("Yes: " + chart[0] + "人");
  d3.select("#No")
  .text("No: " + chart[1] + "人");
  d3.select("#sum")
  .text("合計: " + (chart[0]+chart[1]) + "人");
}

function arcAnime(newdata, flag) {
  svg.selectAll("path")
  .data(pie(newdata))
  .transition()
  .duration(1000)
  .ease("bounce")
  .attrTween("d", function(d) {
    var interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);
    return function(t) {
      return arc(interpolate(t));
    };
  });



  svg.selectAll("text")
  .data(pie(newdata))
  .text(function(d) {
    if(d.data == 0){
      return "";
    }
    if(c_frag[0] == 1){
      if(flag == 0) {
        return y_m_scale(d.data) + "%";
      } else if(flag == 1) {
        return y_w_scale(d.data) + "%";
      }
      return y_a_scale(d.data) + "%";
    }else if(c_frag[1] == 1){
      if(flag == 0) {
        return n_m_scale(d.data) + "%";
      } else if(flag == 1) {
        return n_w_scale(d.data) + "%";
      }
      return n_a_scale(d.data) + "%";
    }else{
      if(flag == 0) {
        return m_scale(d.data) + "%";
      } else if(flag == 1) {
        return w_scale(d.data) + "%";
      }
      return a_scale(d.data) + "%";
    }
  })
  .transition()
  .duration(1000)
  .ease("bounce")
  .attrTween("transform", function(d) {
    var interpolate = d3.interpolate(arc.centroid(this._current), arc.centroid(d));
    this._current = d;
    return function(t) {
      return "translate(" + interpolate(t) + ")";
    };
  });

}
