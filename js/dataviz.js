//google.charts.load('current', {packages: ['corechart']});
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

var defaultStoryId = "002fb75c-72a7-48e2-8d08-9d2f47fc1a29";
var sampleIds;


d3.json("https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/storyIds_sample.php", function(error, data) {
  console.log("Got sample IDs.");
  dataJson = data;
  sampleIds = d3.keys(dataJson);
  addStoriesToSelect(false);
  loadStory(defaultStoryId);
  $("#storySelecter").prop("value",defaultStoryId).selectpicker("refresh");
  
  d3.json("https://homes.cs.washington.edu/~msap/debug/storycommonsense/data/viz/storyIds.php", function(error, data) {
    console.log("Got all IDs.");
    dataJson = data;
    addStoriesToSelect(true);
  });
    
    /*Load default story:*/
    // loadStory("002fb75c-72a7-48e2-8d08-9d2f47fc1a29")
  // 
});


function addStoriesToSelect(append){
  $.each(dataJson,function(k,v){
    if (!append || $.inArray(k, sampleIds) == -1){
      $("#storySelecter").append('<option class="'+v.partition+'" value="'+k+'" data-toggle="'+v.title+'">'+v.title+'</option>');
    }
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
    }).enter().append("span")
    .html(function (d) {
      d__ = d;
      if (d3.entries(d.value.emotion).length > 0 && d3.entries(d.value.motiv).length > 0)
        return d.key;
      else 
        return "<em>"+d.key+"</em>";
    }).attr("class",function(d){
      class_str = "btn btn-sm ";
      class_str += d.value.app ? "btn-primary": "btn-secondary";
      class_str += (d3.entries(d.value.emotion).length > 0 && d3.entries(d.value.motiv).length > 0) ? "": " disabled";
      return class_str;
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
    }).enter().append("div").filter(function(d){
      return d3.entries(d.value.emotion).length > 0 && d3.entries(d.value.motiv).length > 0;
    })
    .attr("class","collapse annotations")
    //.attr("class","annotations")
    .attr("id",function(d,i){
      return d.key.replace(/\W/g, '')+"_"+d.lineId;
    })
    .html(function(d){
      d___ = d;
      return ;//"<h7><em>"+d.key+"</em>'s mental states</h7><br>";
    });
  // Motivation
  annotations.append("div").text(function(d) {
    d___ = d;
    if (d3.entries(d.value.motiv).length > 0)
      return d.key+"'s motivation";
    else
      return "";
    }).selectAll("span")
    .data(function(d){
      return d3.values(d.value.motiv);
    }).enter().append("span")
    .filter(function(d) {
      
      return true;
    })
    .attr("class","annot")
    .html(function(d){
      d_____ = d;
      out = d.text.join(", ");
      if ("maslow" in d){
        out += " (Maslow: <code>"+d.maslow.join("</code>, <code>")+"</code>";
        if ("reiss" in d && d.reiss.length > 0){
          out += ";&nbsp;Reiss: <code>"+d.reiss.join("</code>, <code>");
        }
        out += "</code>)";
      }
      return out;
    });
  // Emotions
  annotations.append("div").text(function(d) {
      if (d3.entries(d.value.emotion).length > 0)
        return d.key+"'s emotion";
    }).selectAll("span")
    .data(function(d){
      return d3.values(d.value.emotion);
    }).enter().append("span")
    .attr("class","annot")
    .html(function(d){
      d____ = d;
      out = d.text.join(", ");
      if ("plutchik" in d){
        var emotions = d.plutchik.map(x => x.split(":")[0])
        out += " (<code>"+emotions.join("</code>, <code>")+"</code>)";
      }
      return out;
    });
  reloadDescriptions();
}
var descriptions = {  
  "motiv":{  
    "spiritual growth": "Spiritual growth: "+["idealism", "indep", "curiosity", "serenity"].join(", "),
    "esteem": "Esteem: "+["power", "honor", "competition", "status", "approval"].join(", "),
    "love": "Love: "+["belonging", "family", "social", "romance"].join(", "),
    "stability": "Stability: "+["health", "savings", "order", "safety"].join(", "),
    "physiological": "Physiological: "+["food", "rest"].join(", "),
 
    "idealism":"Idealism: pursuing moral ideals ",
    "indep":"Independence: individuality, creativity ",
    "curiosity":"Curiosity: wanting to learn new things ",
    "serenity":"Serenity: wanting peace of mind ",

    "power":"Power: ability to influence others or achieve goals",
    "honor":"Honor: following socially-accepted values",
    "competition":"Competition: wanting to win, to prove oneself",
    "status":"Status: seek the respect or attention of others",
    "approval":"Approval: wanting acceptance or validation",

    "belonging":"Belonging: to be accepted into society and social groups ",
    "family":"Family: sense of connection with family members ",
    "contact":"Social contact: being or connecting with people ",
    "romance":"Romance: romantic or sexual relationships ",
    
    "health":"Health: wanting to secure one's health or fitness ",
    "savings":"Savings: wanting to secure property or other resources ",
    "order":"Order: wanting a stable environment ",
    "safety":"Safety: wanting to avoid danger ",
    
    "food":"Food: eating, drinking ",
    "rest":"Rest: rest, sleep "
  
  },
  "emotion":{  
    "joy":"Joy: a feeling of great pleasure and happiness",
    "trust":"Trust: firm belief in the reliability, truth, ability, or strength of someone or something",
    "fear":"Fear: an unpleasant emotion caused by the belief that someone or something is dangerous, likely to cause pain, or a threat",
    "surprise":"Surprise: (mild) astonishment or shock caused by something unexpected",
    "sadness":"Sadness: emotional pain associated with, or characterized by, feelings of disadvantage, loss, despair, grief, helplessness, disappointment and sorrow",
    "disgust":"Disgust: revulsion or profound disapproval aroused by something unpleasant or offensive",
    "anger":"Anger: strong feeling of annoyance, displeasure, or hostility",
    "anticipation":"Anticipation: an emotion involving pleasure, excitement, or anxiety in considering an expected event"
  }
}
var event;
function formatDescription(descStr){
  var desc = descStr.split(":");
  return "<em>"+desc[0]+"</em>: "+desc[1]
}
function reloadDescriptions(){
  for (e in descriptions.emotion){
    $("code:contains("+e+")").prop("title",descriptions.emotion[e]).hover(function(ev){
      $("#categoryDescription").html(formatDescription(descriptions.emotion[ev.target.textContent]));
    },function(ev){$("#categoryDescription").text("")});
  }
  for (cat in descriptions.motiv){
    $("code:contains("+cat+")").prop("title",descriptions.motiv[cat]).hover(
      function(ev){
        $("#categoryDescription").html(formatDescription(descriptions.motiv[ev.target.textContent]));
      },
      function(ev){
        $("#categoryDescription").html("")
      });
  
  }
}




