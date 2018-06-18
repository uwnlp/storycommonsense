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
  spinner.stop();
});
//https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/getStoryJson.php?storyid=013e6510-5cd4-4b4e-bd7e-491d3732602b

function addStoriesToSelect(){
  $.each(dataJson,function(k,v){
    $("#storySelecter").append('<option class="'+v.partition+'" value="'+k+'" data-toggle="'+v.title+'">'+v.title+'</option>');
  });
  $("#storySelecter").selectpicker("refresh");
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
    console.log(data);
    $("#actualStory").show().fadeTo(50, 1);
    story = JSON.parse(data);
    storyJson2Text(storyid);
    spinner.stop();
  });
}