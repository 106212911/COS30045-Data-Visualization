const DATA_PATH = "assets/data/Data_exercise 5.3.csv"; // change if your CSV is elsewhere

const width = 500;
const height = 400;
const margin = 40;
const radius = Math.min(width, height) / 2 - margin;

d3.csv(DATA_PATH).then(data => {
  console.log(data);

  // first column = category, second column = count
  const labelKey = data.columns[0];
  const valueKey = data.columns[1];
  data.forEach(d => (d[valueKey] = +d[valueKey]));

  // Changed: new colour scheme
  const colourScale = d3.scaleOrdinal()
    .domain(data.map(d => d[labelKey]))
    .range(d3.schemeTableau10);

  const pie = d3.pie()
    .value(d => d[valueKey])
    .sort(null);

  // Changed: bigger padAngle and cornerRadius
  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)   // set to 0 to turn it into a pie chart
    .outerRadius(radius)
    .padAngle(0.05)
    .cornerRadius(10);

  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const arcs = g.selectAll(".arc")
    .data(pie(data))
    .join("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("d", arcGenerator)
    .attr("fill", d => colourScale(d.data[labelKey]));

  arcs.append("text")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", "12px")
    .text(d => d.data[labelKey]);
});