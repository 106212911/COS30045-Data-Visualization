// 1. Create the SVG canvas within the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

// 2. Create the function to bind and draw the data
const drawBarChart = data => {
    
    // Define constants for the layout
    const barHeight = 20; 
    const barSpacing = 5; 

    svg.selectAll("rect")
       .data(data)
       .join("rect")
       .attr("class", d => "count-" + d.count) // Step 1: Bind class
       
       // Step 2: Make data visible
       .attr("width", d => d.count)  // Width is relative to the count data
       .attr("height", barHeight)    // Height uses our constant
       .attr("fill", "blue")         // Give it a color so we can see it
       
       // Step 3: Space out the bars
       .attr("x", 0)                 // All bars start at the far left (x = 0)
       .attr("y", (d, i) => i * (barHeight + barSpacing)); // Spaces them downwards along the y-axis
};

// 3. Load the CSV data and format the attributes
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    // Sort the data from highest count to lowest count
    data.sort((a, b) => b.count - a.count);
    
    // Pass the sorted data to the function that draws the chart
    drawBarChart(data);
});