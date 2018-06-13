var dataJson, story;
d3.json("https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/annotations_sample.php", function(error, data) {
  dataJson = data;
  addStoriesToSelect();
});

function addStoriesToSelect(){
  $.each(dataJson,function(k,v){
    $("#storySelecter").append('<option class="'+v.partition+'" value="'+k+'" data-toggle="'+v.title+'">'+v.title+'</option>');
  });
  $("#storySelecter").selectpicker("refresh");
}

function storyJson2Text(storyid){
  $("#storyViz").show();
  $("#storyVizKey").show();
  story = dataJson[storyid];
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
  storyJson2Text(storyid);
}