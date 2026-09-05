Exercise 3 — TV Energy Consumption Data Story
Data Story

The Buyers: First-time TV buyers in Australia who are comparing a shortlist of TVs before purchasing and want to understand how much their choice will cost to run. They have no technical background in energy ratings and are looking for a quick, practical answer rather than a detailed technical breakdown.

Their interest in this visualisation: Many buyers assume that newer display technology (like OLED) is automatically more energy-efficient than older technology. This page tests that assumption directly against real energy rating data, showing average annual running cost by screen technology, so buyers can make a more informed comparison instead of relying on that assumption.

About the Data

Data source: Australian Government appliance energy consumption dataset for televisions (tv_2026_02_15.csv), sourced via the Energy Rating website (energyrating.gov.au), as provided for COS30045 Exercise 1.

Data processing: The raw CSV was processed in KNIME. Relevant columns (including Screen_Tech and Labelled energy consumption (kWh/year)) were selected, text fields were standardised for consistent brand/technology naming (String Cleaner, String Replacer), and rows with missing or unavailable status were filtered out. The data was then grouped by Screen_Tech using a Pivot node, aggregating the mean annual energy consumption for each technology group.

Privacy: The dataset contains only product-level information (model, brand, screen technology, energy rating) with no personal or identifiable data about individuals, so no privacy concerns apply.

Accuracy and limitations: Energy ratings reflect standardised lab test conditions, not real-world usage, which varies with brightness settings, usage hours, and viewing habits. The comparison uses group averages by screen technology and does not control for screen size, which independently affects energy consumption — larger screens generally consume more regardless of technology. The dataset also only reflects models currently listed and may not include every TV on the market or capture very recent releases.

Ethics: The data is presented to help consumers make informed purchasing decisions, not to favour or criticise any particular brand or manufacturer. Categories are compared using the same metric (mean kWh/year) and time period, and the limitation around screen size is disclosed transparently rather than omitted, so the finding isn't overstated.