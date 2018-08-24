(function () {

  var margin = { top: 20, right: 10, bottom: 20, left: 40 }

  var width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

    // You'll probably need to edit this one

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>" + d.title + ":</strong> <span>" + "the hapax rate is " + d.hapax_over_unique + "</span>";
    })

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  svg.call(tip)

  var xPositionScale = d3.scaleLinear()
    .domain([0,45000])
    .range([0,width])

  var yPositionScale = d3.scaleLinear()
    .domain([0,7500])
    .range([height,0])

  var colorScale = d3.scaleOrdinal()
    .range(['red', 'orange', 'blue', 'green', 'yellow', 'purple'])



  // Read in some external data. When we're done, run the function 'ready'

  d3.queue()
    .defer(d3.csv, 'shakespeare_hapaxes_titles.csv')
    .await(ready)

  // This is 'ready':
  // it receives an error (if there is one)
  // and datapoints, our newly-read-in data
  function ready(error, datapoints) {
    console.log("Data is", datapoints)
    // d3 code goes here

    svg.selectAll('circle')
      .data(datapoints)
      .enter().append('circle')
      .attr('r', 5)
      .attr('cx', function (d) {
        return xPositionScale(d.how_many_words)
      })
      .attr('cy', function (d) {
        return yPositionScale(d.how_many_hapaxes)
      })
      .attr('fill', 'purple')
      .attr('opacity', .7)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)



    // Always cut and paste the code for the axes!


  }

})()