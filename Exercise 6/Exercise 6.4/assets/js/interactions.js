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

function createTooltip() {
  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "#27ae60")
    .attr("opacity", 0.85);

  tooltip.append("text")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 4)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", 12)
    .style("font-weight", "600");
}

function handleMouseEvents() {
  innerChartS.selectAll("circle")
    .on("mouseenter", function (e, d) {
      console.log("enter", d);

      d3.select(".tooltip text").text(`${d.screenSize} inch`);

      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");

      // put it above the circle, or below if too close to the top
      const tx = cx - tooltipWidth / 2;
      const ty = cy - tooltipHeight - 8 < 0 ? cy + 10 : cy - tooltipHeight - 8;

      d3.select(".tooltip")
        .attr("transform", `translate(${tx},${ty})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", function (e, d) {
      console.log("leave", d);

      d3.select(".tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0);
    });
}