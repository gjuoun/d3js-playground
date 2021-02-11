var data = [30, 50, 86, 120, 168, 220];

// d3.select(".chart")
//   .selectAll("div")
//   .data(data)
//     .enter()
//     .append("div")
//     .style("width", function(d) { return d + "px"; })
//     .text(function(d) { return d; });

d3.select(".chart")
  .selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .style("width", function (d) { return d + "px"; })
  .text(function (d) { return d; });


d3.select(".chart")
  .selectAll("button")
  .data(data)
  .enter()
  .append("button")
  .text(function (d) { return d; })
  .style("background-color", (d) => {
    return `rgb(${d} 120 200)`
  })