var layer = L.tileLayer('https://api.mapbox.com/styles/v1/livenlulu/civklqgt8007y2kqqt5b61zc9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl2ZW5sdWx1IiwiYSI6ImNpZ3h0ZzltbzB1cTQ0cG0zamthcno1dmwifQ.vZrmbXCCq15ZVuF6g6vhkA',{
    attribution: ''
});

// var layer = L.tileLayer('https://api.mapbox.com/styles/v1/livenlulu/ciu0azvas00322in5xzze3u48/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl2ZW5sdWx1IiwiYSI6ImNpZ3h0ZzltbzB1cTQ0cG0zamthcno1dmwifQ.vZrmbXCCq15ZVuF6g6vhkA',{
//     attribution: ''
// });
var map = L.map('myMap', { 
  attributionControl: false,
  tap:false
}).setView( [40.730608,-73.927860], 13);
map.addLayer(layer);

var rentData = [];
rentData[0]={};
var currid=0;
var med=0;
    

var chart;
var chart2;
var chart3;

var manhattan = [40.763121,-73.948288];
var brooklyn = [40.637925,-73.948288];
var bronx = [40.841606, -73.874817];
var queens = [40.716298,-73.853874];
var statenisland = [40.571719,-74.148788];

var panOptions = {
    animate: true,
    duration: 2
 	}

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        map.panTo(manhattan, panOptions);
      } 
      
      else if 
      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#fff');
        map.panTo(brooklyn, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#fff');
        map.panTo(bronx, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#fff');
        map.panTo(queens, panOptions);
      } 

      else {
        $(this).css('background-color','#fff');
        map.panTo(statenisland, panOptions);
      }
    });
      
// function onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//     }
// }

  $("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
    });

  var geojson;

  $.getJSON('data/var.geojson', function(data) {
    geojson = L.geoJson(data, {
    	style: style,
    	onEachFeature: onEachFeature
    }).addTo(map);
    updateChart(data.features[currid].properties)
    updateChart2(data.features[currid].properties)
    updateChart3(data.features[currid].properties)

  });


  function getColor(d) {
    return d > 90 ? '#073e5f' :
           d > 70  ? '#216086' :
           d > 50  ? '#4e89ad' :
           d > 30  ? '#9AC7E2' :
           // d > 35  ? '#E86464' :
           // d > 20  ? '#D97777' :
           // d > 10  ? '#EB9696' :
                     '#e1f3fd' ;

        // return d > 90 ? '#08517C' :
        //    d > 70  ? '#2975A2' :
        //    d > 50  ? '#5799C0' :
        //    d > 30  ? '#9AC7E2' :
        //    // d > 35  ? '#E86464' :
        //    // d > 20  ? '#D97777' :
        //    // d > 10  ? '#EB9696' :
        //              '#F1F8FC' ;
  }



  function style(feature) {
    return {
        fillColor: getColor(feature.properties.VALUE2),
        weight: .3,
        opacity: .8,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.8
    };
  }

  function mouseoverFunction(e) {
    var layer = e.target;
    // med value
    //med = e.target.feature.properties.median_income;
    //console.log(med);

    layer.setStyle({
        weight: 5,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    // try updatechart
    updateChart(e.target.feature.properties);
    updateChart2(e.target.feature.properties);
    updateChart3(e.target.feature.properties);

    // console.log(layer.feature.properties.VALUE2);
    $('#side').html('<h4>Units available for rent on this block: ' + '<br><b><font size ="5" color="#08517C">' + layer.feature.properties.VALUE2 + '%' +'</font></b> ' + '</h4>');
  	}

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }



//dropdown scroll
  $(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  });


//bar chart
nv.addGraph(function() {
  chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .staggerLabels(true)
    .showValues(true)
    .margin({left:0,right:0})
    // .color(['rgb(77,175,74)','rgb(228,26,28)'])  
    // 'rgb(55,126,184)'
    .color(['#C5766E', '#94362C', '#730B00'])
    .valueFormat(function(d){
        return "$" + Math.round(d * 10)/10;
      });
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});


nv.addGraph(function() {
  chart2 = nv.models.discreteBarChart()
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .staggerLabels(true)
    .showValues(true)
    .margin({left:0,right:0})
    // .color(['rgb(77,175,74)','rgb(228,26,28)'])  
    // 'rgb(55,126,184)'
    .color(['#8FACA0', '#578F77', '#2D7556', '#0C5837', '#004025'])
    .valueFormat(function(d){
        return Math.round(d * 10)/10 + "%";
      });
    ;

  nv.utils.windowResize(chart2.update);

  return chart2;
});

nv.addGraph(function() {
  chart3 = nv.models.discreteBarChart()
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .staggerLabels(true)
    .showValues(true)
    .margin({left:0,right:0})
    // .color(['rgb(77,175,74)','rgb(228,26,28)'])  
    // 'rgb(55,126,184)'
    .color(['#E0AA63', '#D1821C'])
    .valueFormat(function(d){
        return Math.round(d * 10)/10;
      });
    ;

  nv.utils.windowResize(chart3.update);

  return chart3;
});


//Each bar represents a single discrete quantity.
function updateChart(f){

  rentData[0].key = "vacancyrent";
  rentData[0].values =
    [
        // { 
        //   "label" : "Median Monthly Income" , 
        //   "value" : f.median_income / 12
        // } , 
        { 
          "label" : "Median Rent" , 
          "value" : f.vmedian_rent 
        } , 
        { 
          "label" : "30% Of HH Income" , 
          "value" : f.vmr / 12 * .3
        } ,
        { 
          "label" : "Poverty Line" , 
          "value" : 980.83
        } 
      ]
    d3.select('#chart svg')
    .datum(rentData)
    .transition().duration(500)
    .call(chart);
  
}

function updateChart2(f){

  rentData[0].key = "vacancyrent";
  rentData[0].values =
    [
        // { 
        //   "label" : "Median Monthly Income" , 
        //   "value" : f.median_income / 12
        // } , 
        { 
          "label" : "White" , 
          "value" : f.white
        } , 
        { 
          "label" : "Black" , 
          "value" : f.black
        } ,
        { 
          "label" : "Asian" , 
          "value" : f.asian
        } ,
        { 
          "label" : "Hispanic" , 
          "value" : f.hispanic
        } ,
        { 
          "label" : "Other" , 
          "value" : f.otherrace + f.americanin
        } 
      ]
    d3.select('#chart2 svg')
    .datum(rentData)
    .transition().duration(500)
    .call(chart2);
  
}


function updateChart3(f){

  rentData[0].key = "vacancyrent";
  rentData[0].values =
    [
        { 
          "label" : "Median Male Age" , 
          "value" : f.malemedage
        } , 
        { 
          "label" : "Median Female Age" , 
          "value" : f.femalemeda
        } 
      ]
    d3.select('#chart3 svg')
    .datum(rentData)
    .transition().duration(500)
    .call(chart3);
  
}
//bulletchart
// nv.addGraph(function() {  
//   var chart2 = nv.models.bulletChart();

//   d3.select('#chart2 svg')
//       .datum(exampleData())
//       .transition().duration(1000)
//       .call(chart2);

//   return chart2;
// });


// function exampleData() {
//   return {
//     "title":"Revenue",    //Label the bullet chart
//     "subtitle":"US$",   //sub-label for bullet chart
//     "ranges":[150,225,300],  //Minimum, mean and maximum values.
//     "measures":[220],    //Value representing current measurement (the thick blue line in the example)
//     "markers":[250]      //Place a marker on the chart (the white triangle marker)
//   };
// }


