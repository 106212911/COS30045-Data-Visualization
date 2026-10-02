function drawScatterplot(data) {
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg.append("g")
    .attr("class", "inner-chart-s")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // scales
  const maxStar = d3.max(data, d => d.star);
  const maxEnergy = d3.max(data, d => d.energyConsumption);

  xScaleS.domain([0, maxStar]).range([0, innerWidth]).nice();
  yScaleS.domain([0, maxEnergy]).range([innerHeight, 0]).nice();

  // circles
  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // axes
  innerChartS.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g").attr("class", "axis")
    .call(d3.axisLeft(yScaleS));

  // axis labels
  svg.append("text").attr("class", "axis-label")
    .attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Star rating");

  svg.append("text").attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + innerHeight / 2))
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Energy consumption (kWh/year)");

  // legend, top right
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 110},${margin.top})`);

  colorScale.domain().forEach((tech, i) => {
    const item = legend.append("g")
      .attr("transform", `translate(0,${i * 20})`);

    item.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", colorScale(tech));

    item.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .attr("font-size", 12)
      .text(tech);
  });
}