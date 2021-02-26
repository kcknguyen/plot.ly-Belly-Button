 // Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("data/samples.json").then((importedData) => {
  console.log(importedData);
    var data = importedData;
  
    //load 
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
  
    // Slice the first 10 objects for plotting
    var a_samplevalues = dataload.map(value => value.sample_values(0,10));
    a_samplevalues = a_samplevalues[0].map.value(value => parseFloat(a.sample_values);
    a_samplevalues = a_samplevalues.reverse();
    console.log(a_samplevalues);
    //value.otu_ids.slice(0, 10));
  
    // Reverse the array due to Plotly's defaults
    data = data.reverse();
  
    // Trace1 for the Greek Data
    function init() {
    var trace1 = {
      x: data.map(row => row.greekSearchResults),
      y: data.map(row => row.greekName),
      text: data.map(row => row.greekName),
      name: "bar",
      type: "bar",
      orientation: "h"
    };
  
    // data
    var barchartData = [trace1];
  
    // Apply the group bar mode to the layout
    var layout = {
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
}});
