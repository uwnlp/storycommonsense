var dataJson, story, spinner;

var opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 9, // The line thickness
  radius: 47, // The radius of the inner circle
  scale: .25, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#ffffff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  //zIndex:  0, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '20px', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 .5px transparent', // Box-shadow for the lines
  position: 'relative' // Element positioning
};

// window.onload = function() {
  // $("#storyViz").show();
  // var target = document.getElementById('storyViz');
  // spinner = new Spinner(opts).spin(target);
// }

d3.json("https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/storyIds.php", function(error, data) {
  dataJson = data;
  addStoriesToSelect();
  // spinner.stop();
});
//https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/getStoryJson.php?storyid=013e6510-5cd4-4b4e-bd7e-491d3732602b

function addStoriesToSelect(){
  $.each(dataJson,function(k,v){
    $("#storySelecter").append('<option class="'+v.partition+'" value="'+k+'" data-toggle="'+v.title+'">'+v.title+'</option>');
  });
  $("#storySelecter").selectpicker("refresh");

  //Load default story:
  loadStory("002fb75c-72a7-48e2-8d08-9d2f47fc1a29")
}


function storyJson2Text(storyid){
  //story = dataJson[storyid];
  var out = "";
  $("#title").prop("innerText",story.title);
  $.each(story.lines,function (ix,d){
    var chars = [];
    $.each(d.characters,function (c,cd) {
      if (cd.app)
        chars.push('<span class="badge badge-pill badge-primary">'+c+'</span>');
      else 
        chars.push('<span class="badge badge-pill badge-secondary">'+c+'</span>');
    });
    var charStr = chars.join(" ");
    $("#line"+ix).prop("innerHTML",d.text+"&nbsp;"+charStr);
  });
}
function loadStory(storyid){
  $("#storyViz").show();
  $("#actualStory").fadeTo(50, 0.3);
  $("#storyVizKey").show();
  var target = document.getElementById('storyViz');
  spinner = new Spinner(opts).spin(target);

  var url = "https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/getStoryJson.php?storyid="+storyid;
  console.log(url);
  $.get(url, function(data, status) {
    //console.log(data);
    $("#actualStory").show().fadeTo(50, 1).empty();
    story = JSON.parse(data);
    //storyJson2Text(storyid);
    storyVizD3(story);
    spinner.stop();
  });
}
var d_,d__,d___,d____,d_____;
function storyVizD3(story){
  var div = d3.select("#actualStory");
  //console.log(story.lines);
  var lineId=0;
  // Line text
  var lines = div.selectAll("p")
    .data(d3.entries(story.lines))
    .enter().append("p")
    .attr("class","story-line")
    .text(function(d,i) {
      d_ = d;
      return d.value.text;
    });
  // Character names
  lines.selectAll("span")
    .data(function(d) {
      var data = d3.entries(d.value.characters);
      data.forEach(function(v,k,arr){
        arr[k].lineId=d.key;
      });
      return data;
    }).enter()
    .append("span")
    .text(function (d) {
      d__ = d;
      return d.key;
    }).attr("class",function(d){
      return d.value.app ? "badge badge-pill badge-primary": "badge badge-pill badge-secondary";
    }).attr("data-toggle","collapse")
    .attr("data-target",function(d,i){
      return "#"+d.key.replace(/\W/g, '')+"_"+d.lineId;
    });

  // Character information
  var annotations = lines.selectAll("div")
    .data(function(d) {
      var data = d3.entries(d.value.characters);
      data.forEach(function(v,k,arr){
        arr[k].lineId=d.key;
      });
      return data;
    }).enter().append("div")
    .attr("class","collapse annotations")
    //.attr("class","annotations")
    .attr("id",function(d,i){
      return d.key.replace(/\W/g, '')+"_"+d.lineId;
    })
    .html(function(d){
      d___ = d;
      return "<h7><em>"+d.key+"</em>'s mental states</h7><br>";
    });
  // Emotions
  annotations.append("div").text("Emotion").selectAll("span")
    .data(function(d){
      return d3.values(d.value.emotion);
    }).enter().append("span")
    .html(function(d){
      d____ = d;
      out = "";
      out += "<br>free text: "+d.text.join(", ");
      if ("plutchik" in d){
        out += "; ";  
        out += "Plutchik: "+d.plutchik.join(", ");
      }
      return out;
    });
  // Motivation
  annotations.append("div").text("Motivation").selectAll("span")
    .data(function(d){
      console.log(d3.values(d.value.motiv));
      return d3.values(d.value.motiv);
    }).enter().append("span")
    .html(function(d){
      d_____ = d;
      out = "";
      out += "<br>free text: "+d.text.join(", ");
      if ("maslow" in d){
        out += "; ";  
        out += "Maslow: "+d.maslow.join(", ");
      }
      return out;
    });

}