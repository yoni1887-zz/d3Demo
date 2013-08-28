
//Width and height
var w = 500;
var h = 200;
var barPadding = 1;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

d3.max(dataset, function(d) {    //Returns 480
    return d[0];  //References first value in each sub-array
});

var xScale = d3.scale.linear()
//			.domain([0, d3.max(dataset, function(d) { return d[0]; })])
    .domain([0, d3.max(dataset)])
    .range([0, w]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);
//			.domain([0, d3.max(dataset, function(d) { return d[1]; })])

//Create SVG element
var svg = d3.select("#graph1")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * (w / dataset.length);
    })
    .attr("y", function(d) {
        return h - ( yScale(d) );
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("fill", "#b8dced");

//			var data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ],
var data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
    w = 500,
    h = 200,
    margin = 20,
    y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]),
    x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin])

var vis = d3.select("#graph2")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)

var g = vis.append("svg:g")
    .attr("transform", "translate(0, 200)");

var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d); })
    .y0(h)
    .y1(function(d) { return y(d); });

var line = d3.svg.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return -1 * y(d); })

g.append("svg:path").attr("d", line(data));

g.append("svg:line")
    .attr("x1", x(0))
    .attr("y1", -1 * y(0))
    .attr("x2", x(w))
    .attr("y2", -1 * y(0))

g.append("svg:line")
    .attr("x1", x(0))
    .attr("y1", -1 * y(0))
    .attr("x2", x(0))
    .attr("y2", -1 * y(d3.max(data)))

g.selectAll(".xLabel")
    .data(x.ticks(data.length))
    .enter().append("svg:text")
    .attr("class", "xLabel")
    .text(String)
    .attr("x", function(d) { return x(d-1) })
    .attr("y", 0)
    .attr("text-anchor", "middle")

g.selectAll(".yLabel")
    .data(y.ticks(4))
    .enter().append("svg:text")
    .attr("class", "yLabel")
    .text(String)
    .attr("x", 0)
    .attr("y", function(d) { return -1 * y(d) })
    .attr("text-anchor", "right")
    .attr("dy", 4)