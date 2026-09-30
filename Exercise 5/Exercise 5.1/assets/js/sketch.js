// 1. Set dimensions and margins for the chart
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// 2. Append the main SVG container to the #bar-chart div
const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// 3. Append an inner chart group element transformed by the margins
const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// 4. Load the CSV Data (matches the exact column names from your KNIME output)
d3.csv("data/Data_exercise 5.1.csv").then(data => {

    // Convert string numeric values to numbers
    data.forEach(d => {
        d.EnergyConsumption = +d["Mean(Labelled energy consumption (kWh/year))"];
    });

    // Sort data in descending order by energy consumption
    data.sort((a, b) => b.EnergyConsumption - a.EnergyConsumption);

    console.log("Loaded and Sorted Data:", data);

    // Call the chart drawing function
    drawBarChart(data);

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});

// 5. Chart Drawing Function
const drawBarChart = data => {

    // Set up X Scale (Band scale for categorical screen types)
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, width])
        .padding(0.2);

    // Set up Y Scale (Linear scale for quantitative energy consumption)
    const yScale = tidigareScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.EnergyConsumption) * 1.1]) // Adds 10% headroom at the top
        .range([height, 0]);

    // Append X Axis to the bottom of the inner chart
    const xAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Append Y Axis to the inner chart
    const yAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    // Add Y Axis Label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("Mean Energy Consumption (kWh/year)");

    // Draw the Bars
    innerChart.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.EnergyConsumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.EnergyConsumption));

    // Add numerical value labels on top of each bar
    innerChart.selectAll(".bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.EnergyConsumption) - 8)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("fill", "#333")
        .text(d => `${d.EnergyConsumption.toFixed(1)} kWh`);
};