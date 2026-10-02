function populateFilters(data) {
  d3.select("#filters_screen")
    .selectAll("button")
    .data(filters_screen)
    .join("button")
    .text(d => d.label)
    .attr("id", d => d.id)
    .classed("active", d => d.isActive)
    .on("click", (event, d) => {
      filters_screen.forEach(f => f.isActive = (f.id === d.id));
      d3.selectAll("#filters_screen button").classed("active", f => f.isActive);
      console.log(filters_screen);
      updateHistogram(d.id, data);
    });
}

function updateHistogram(id, data) {
  const updatedData = id === "all"
    ? data
    : data.filter(d => d.screenTech === id);

  const updatedBins = binGenerator(updatedData);

  d3.select("#chart .inner-chart")
    .selectAll("rect")
    .data(updatedBins)
    .join("rect")
    .transition()
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length));
}