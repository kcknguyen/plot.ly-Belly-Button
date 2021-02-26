 // Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
  console.log(importedData);
  let data = importedData;
  function init(){
  var selector = d3.select("#selDataset");
   var nameid = data.names;
    nameid.forEach((id) => {
      selector.append('option').text(id).property('value', id);
    });
const loadnameid = nameid[0];
var dataload = data.sample.filter(suject = subjectid === loadnameid);

    // Sort the data array using the sample_value
    dataload.sort(function(a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });
  
    // Slice the first 10 objects of sample_values for plotting
    var a_samplevalues = dataload.map(value => value.sample_values(0,10));
    a_samplevalues = a_samplevalues[0].map.value(value => parseFloat(a.sample_values));
    // Reverse the array due to Plotly's defaults
    a_samplevalues = a_samplevalues.reverse();
    console.log(a_samplevalues);
   
    // Slice the first 10 objects of the otu_ids for plotting
    var aotuids = dataload.map(value => value.otu_ids.slice(0,10));
    var botuids = aotuids[0].map(value => "OTU " + String(value));
    
    // Slice the first 10 objects of the otu_labels for plotting
    var aotu_labels = dataLoad.map(value => value.otu_labels.slice(0,10));
    //value.otu_ids.slice(0, 10));
  
// Creat trace for chart
    var trace1 = {
      x: a_samplevalues ,
      y: b.otuids,
      text: a.otu_labels
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
}});
init();
