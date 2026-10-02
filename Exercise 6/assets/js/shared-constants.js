const width = 800, height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const barColor = "steelblue";
const bodyBackgroundColor = "#f5f5f5";

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .thresholds(15);   // adjust to get ~14 bins