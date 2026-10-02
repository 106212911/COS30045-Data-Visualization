function drawHistogram(data) {
  const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const inner = svg.append("g")
    .attr("class", "inner-chart")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const bins = binGenerator(data);

  xScale.domain([bins[0].x0, bins[bins.length - 1].x1]).range([0, innerWidth]);
  yScale.domain([0, d3.max(bins, d => d.length)]).range([innerHeight, 0]);

  inner.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

  inner.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));

  inner.append("g").attr("class", "axis")
    .call(d3.axisLeft(yScale));

  svg.append("text").attr("class", "axis-label")
    .attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Energy consumption (kWh/year)");

  svg.append("text").attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + innerHeight / 2))
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Number of TVs");
}