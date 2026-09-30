// 1. Set dimensions and margins (matching Exercise 5.1 for layout consistency)
const lineMargin = { top: 40, right: 30, bottom: 60, left: 70 };
const lineWidth = 600 - lineMargin.left - lineMargin.right;
const lineHeight = 400 - lineMargin.top - lineMargin.bottom;

// 2. Append SVG container for the line chart
const lineSvg = d3.select("#line-chart")
    .append("svg")
    .attr("width", lineWidth + lineMargin.left + lineMargin.right)
    .attr("height", lineHeight + lineMargin.top + lineMargin.bottom);

// 3. Append inner chart group
const lineInnerChart = lineSvg.append("g")
    .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

// 4. Load the Spot Prices CSV Data
d3.csv("data/ARE_Spot_Prices.csv").then(data => {

    // Parse data: interpret Year as a number and read the exact average column header
    data.forEach(d => {
        d.year = +d.Year;
        d.averagePrice = +d["Average Price (notTas-Snowy)"];
    });

    console.log("Loaded Spot Price Data:", data);

    // Call chart drawing function
    drawLineChart(data);

}).catch(error => {
    console.error("Error loading ARE_Spot_Prices.csv:", error);
});

// 5. Line Chart Drawing Function
const drawLineChart = data => {

    // X Scale: Continuous linear scale using d3.extent for min/max years (1998-2024)
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, lineWidth]);

    // Y Scale: Continuous linear scale for prices with 10% headroom
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice) * 1.1])
        .range([lineHeight, 0]);

    // Setup Axes (forcing year ticks to display as integers without comma grouping)
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale);

    // Append X Axis
    lineInnerChart.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${lineHeight})`)
        .call(xAxis);

    // Append Y Axis
    lineInnerChart.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    // Add Y Axis Label
    lineInnerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -lineHeight / 2)
        .attr("text-anchor", "middle")
        .text("Average Spot Price ($/MWh)");

    // Add X Axis Label
    lineInnerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", lineWidth / 2)
        .attr("y", lineHeight + 40)
        .attr("text-anchor", "middle")
        .text("Year");

    
    lineInnerChart.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("r", 4)
        .attr("fill", "#e74c3c");

    
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    lineInnerChart.append("path")
        .datum(data)
        .attr("class", "line-path")
        .attr("fill", "none")
        .attr("stroke", "#2980b9")
        .attr("stroke-width", 2.5)
        .attr("d", lineGenerator);
};