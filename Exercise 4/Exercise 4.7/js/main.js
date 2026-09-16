const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 600 500") // Expanded width to make room for brand labels
    .style("border", "1px solid black");

 
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));

 
  data.sort((a, b) => b.count - a.count);

 
  drawBarChart(data);
  
});

 
const drawBarChart = data => {
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 350]); // Adjusted range to fit inside the new 600 viewBox width

 
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  // Step 2: Create a group container (g) for our bars and labels together
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(140, ${yScale(d.brand)})`); // Shifts groups right and down

  // Step 3: Append rectangles inside each group container
  barAndLabel
    .append("rect")
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", 0); // y is 0 because the group handles the vertical positioning

  // Step 4: Add the brand category text labels on the left
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", -10)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .attr("text-anchor", "end")
    .style("font-size", "11px");

  // Step 5: Add the exact value number at the end of each bar
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", yScale.bandwidth() / 2 + 4)
    .style("font-size", "11px");
};