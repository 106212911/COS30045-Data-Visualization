d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
  brand: d.brand,
  model: d.model,
  star: +d.star2,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption
})).then(data => {
  console.log(data);
  data = data.filter(d => d.energyConsumption <= 1800);
  drawHistogram(data);
  populateFilters(data);
});