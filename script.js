import { alphabetCSV } from "./alphabet.js"

const drawBarChart = () => {
  const data = [30, 50, 86, 120, 168, 220];


  d3.select(".chart")
    .selectAll("button")
    .data(data)
    .enter()
    .append("button")
    // @ts-ignore
    .text(function (d) { return d; })
    .style("background-color", (d) => {
      return `rgb(${d} 120 200)`
    })
}

const drawLongBarchart = () => {
  const data = d3.csvParse(alphabetCSV, ({ letter, frequency }) => (
    { name: letter, value: +frequency }
  )).sort((a, b) => d3.descending(a.value, b.value)) // sort by value, in descending order - high to low

  console.log(data);

  const margin = ({ top: 30, right: 0, bottom: 10, left: 30 })
  let height = 693, width = 720, barHeight = 25;
  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))

  const xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80, data.format))
    .call(g => g.select(".domain").remove())

  const y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)


  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([margin.left, width - margin.right])

  const format = x.tickFormat(20, data.format)



  const chart = () => {
    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth());

    svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => x(d.value))
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => format(d.value))
      .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
        .attr("dx", +4)
        .attr("fill", "black")
        .attr("text-anchor", "start"));

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    return svg.node();
  }

  return chart()
}

const longBarChart = drawLongBarchart()
document.querySelector(".chart").appendChild(longBarChart)