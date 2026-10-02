const width = 800, height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const bodyBackgroundColor = "#fdfdfd";

// histogram
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 1800])
  .thresholds(d3.range(150, 1800, 150));

const filters_screen = [
  { id: "all",  label: "All",  isActive: true },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// scatterplot
let innerChartS;
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

const tooltipWidth = 65;
const tooltipHeight = 32;

const colorScale = d3.scaleOrdinal()
  .domain(["LCD", "LED", "OLED"])
  .range(["#e67e22", "#2980b9", "#8e44ad"]);