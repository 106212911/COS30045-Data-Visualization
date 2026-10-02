d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  star: +d.star,
  energyConsumption: +d.energyConsumption
})).then(data => {
  console.log(data);
  const histogramData = data.filter(d => d.energyConsumption <= 1800);
  drawHistogram(histogramData);
  populateFilters(histogramData);
  drawScatterplot(data);
  createTooltip();
  handleMouseEvents();
});