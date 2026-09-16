// Load the CSV data and format the attributes
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // The '+' operator converts the string to a number
    };
}).then(data => {
    // Step 2 & 3: Console logs to explore the dataset
    console.log("Full Dataset:", data);
    console.log("Total Records (Length):", data.length);
    console.log("Max Count:", d3.max(data, d => d.count));
    console.log("Min Count:", d3.min(data, d => d.count));
    
    // Sort the data from highest count to lowest count
    data.sort((a, b) => b.count - a.count);
    
    // Pass the sorted data to a function that will draw our chart (we will build this next!)
    drawBarChart(data);
});