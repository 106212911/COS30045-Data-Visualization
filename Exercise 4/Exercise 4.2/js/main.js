// Step 2: Apply a style to an HTML element using D3
// Changes the main heading color to green
d3.select("h1").style("color", "green");

// Step 3: Append a paragraph element using D3
// Selects the container div and appends a new paragraph to it
d3.select("div.container")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Step 4: Append and style an SVG rectangle using D3
// Appends a green rectangle inside the <svg> element
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");