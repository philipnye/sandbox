// based on techslides.com/save-svg-as-an-image


var width = 960,
    height = 500;

var m = 5, // number of series
    n = 90; // number of values

// Generate random data into five arrays.
var data = d3.range(m).map(function() {
  return d3.range(n).map(function() {
    return Math.random() * 100 | 0;
  });
});

var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangePoints([0, height], 1);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

var area = d3.svg.area()
    .interpolate("basis")
    .x(function(d, i) { return x(i); })
    .y0(function(d) { return -d / 2; })
    .y1(function(d) { return d / 2; });

var svg = d3.select("#svg").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(data)
  .enter().append("path")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; })
    .style("fill", function(d, i) { return color(i); })
    .attr("d", area);


//Saving PNG
d3.select("#save").on("click", function(){
  var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
  var img = '<img src="'+imgsrc+'">'; 
  d3.select("#svgdataurl").html(img);

	var canvas = document.querySelector("canvas"),
	    context = canvas.getContext("2d");

	var image = new Image;
	image.src = imgsrc;
	image.onload = function() {
	  context.drawImage(image, 0, 0);

	  //save and serve it as an actual filename
    binaryblob();

	  var a = document.createElement("a");
	  a.download = "sample.png";
	  a.href = canvas.toDataURL("image/png");

	   var pngimg = '<img src="'+a.href+'">'; 
  	   d3.select("#pngdataurl").html(pngimg);

	  a.click();
	};

});

//Creating PNG
function binaryblob(){
	var byteString = atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/, ""));
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var dataView = new DataView(ab);
	var blob = new Blob([dataView], {type: "image/png"});
	var DOMURL = self.URL || self.webkitURL || self;
	var newurl = DOMURL.createObjectURL(blob);

	var img = '<img src="'+newurl+'">'; 
  d3.select("#img").html(img);
}