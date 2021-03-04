function sort_desc(arr) {
    arr.sort(function(a, b) {
     return parseFloat(b) - parseFloat(a);
    })
  };
  
  function optionChanged(id){
  
    console.log("in optionChanged");
    for(i = 0; i < names.length; i++){
      if(names[i] == id){
        create_chart(i);
        show_metdata(i);
        break;
      }
    }
  }
  
  var names;
  var metadata;
  var samples; //contains three nested arrays: i.e.   samples[0].otu_ids[0]
                                                   // samples[0].otu_labels[0]
                                                   // samples[0].sample_values[0]
  
  // Use D3 fetch to read the JSON file
  // The data from the JSON file is arbitrarily named importedData as the argument
  d3.json("data/samples.json").then((data) => {
  
    // get base data for names, samples, metadata
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    
    // Load Combobox
    names.forEach(
        name => d3.select("#selDataset").append('option').text(name).attr('value', name));
    
    // create chart for first subject
    create_chart(0);
    show_metdata(0);
  
  });
  
  if(false){
    console.log(metadata[0])
    console.log(names[0])
    console.log(samples[0].otu_ids);
    console.log(samples[0].otu_labels);
    console.log(samples[0].sample_values);
    var subjectId = 0;
    names[subjectId];
    samples[subjectId];
    metadata[subjectId];
  }
  
  function create_chart(subjectId) {
  
    // Slice the first 10 objects of sample_values for plotting
    var sampleSubject = samples[subjectId];
    var otu_ids = sampleSubject.otu_ids.map(value => "OTU " + String(value)).slice(0,10);
    var sample_values = sampleSubject.sample_values.map(value => parseFloat(value)).slice(0,10);
    var labels = sampleSubject.otu_labels.slice(0,10);
    sample_values.reverse();
    otu_ids.reverse();
    labels.reverse();
  
    // Creat trace for chart
    var trace1 = {
      x: sample_values,
      y: otu_ids,
      text: labels,
      name: "Bar",
      type: "bar",
      orientation: "h"
    };
  
    // data
    var barChart = [trace1];
  
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
    Plotly.newPlot("bar", barChart, layout1);  
  
    // bubble chart
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: labels,
      mode: 'markers',
      marker: {
        size: sample_values.map(value => value * 5),
        color: sample_values,
        sizemode: 'area'
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
          var bubbleChart = [trace2];
        //plot bubble chart
        Plotly.newPlot('bubble', bubbleChart, layout2);
  
  
              
  
  }
  
  function show_metdata(id){
    subjectData = metadata[id];
    console.log(subjectData);
    console.log(subjectData.id);
    console.log(subjectData.gender);
    console.log(subjectData.age);
    console.log(subjectData.location);
  }