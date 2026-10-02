function drawHistogram(data) {
  // svg + inner chart
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const inner = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // bins
  const bins = binGenerator(data);
  console.log(bins);

  // scales
  const minX = bins[0].x0;
  const maxX = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale.domain([minX, maxX]).range([0, innerWidth]);
  yScale.domain([0, binsMaxLength]).range([innerHeight, 0]);

  // bars
  inner.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

  // axes
  inner.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));

  inner.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale));

  // labels
  svg.append("text")
    .attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Energy consumption (kWh/year)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + innerHeight / 2))
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Number of TVs");
}