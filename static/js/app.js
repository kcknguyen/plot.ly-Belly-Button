// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
  console.log(importedData);

var data = importedData;
//selector = d3.select("#selDataset");
//var nameid = data.names;
data.names.forEach(name => d3.select("#selDataset").append('option').text(name).attr('value', name));
 
const loadnameid = data.names[0];
var dataLoad = data.samples.filter(subject => subject.id === loadnameid);

 // Sort the data array using the sample value
 dataLoad.sort(function(a, b) {
   return parseFloat(b.sample_values) - parseFloat(a.sample_values);
 });

 // Slice the first 10 objects of sample_values for plotting
 var asamplevalues = dataLoad.map(value => value.sample_values.slice(0,10));
 asamplevalues = asamplevalues[0].map(value => parseFloat(value));
 // Reverse the array due to Plotly's defaults
 asamplevalues = asamplevalues.reverse();
 console.log(asamplevalues);

 // Slice the first 10 objects of the otu_ids for plotting
 var aotuids = dataLoad.map(value => value.otu_ids.slice(0,10));
 var botuids = aotuids[0].map(value => "OTU " + String(value));
 
 // Slice the first 10 objects of the otu_labels for plotting
 var aotu_labels = dataLoad.map(value => value.otu_labels.slice(0,10));
 //value.otu_ids.slice(0, 10));

// Creat trace for chart
 var trace1 = {
   x: asamplevalues ,
   y: botuids,
   text: aotu_labels,
   name: "Bar",
   type: "bar",
   orientation: "h"
 };

 // data
 var barChartData = [trace1];

 // Apply the group bar mode to the layout
 var layout1 = {
   title: "Top 10 OTU",
   xaxis: {
     title: {
         text: 'sample values'
     }},
 yaxis: {
     title: {
         text: 'otu ids'
     }}

 };
 //Render the plot id "bar"
 Plotly.newPlot("bar", barChartData, layout1);  

// buble chart
var trace2 = {
  x: aotuids[0],
  y: asamplevalues,
  text: aotu_labels[0],
  mode: {
    size: asamplevalues,
    color: aotuids[0]
  }
};
var layout2 = {
      title: 'Top 10 OTU Bubbles',
      showlegend: false,
      xaxis: {
        title: {
          text: 'sample values'
        }},
      yaxis: {
        title: {
          text: 'otu ids'
        }} 
        };
      var bubbleChartData = trace2
    //plot bubble chart
    Plotly.newPlot('bubble', bubbleChartData, layout2);
      });