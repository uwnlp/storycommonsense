<!DOCTYPE html>

<?php
  header("Access-Control-Allow-Origin: *"); 
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

?>


<head>
  <title>Espresso Room - Allen School</title>
  <?php 
  //include("tools/header.php");
  //include("../tools/nav.php");
  ?>
  <script src="js/jquery-3.1.1.min.js"></script>
  <!--script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script-->
  <!--script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script-->
  <script src="js/bootstrap.min.js"></script>
  <script src="js/bootstrap-select.min.js"></script>
  <!--script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
  <script src="https://d3js.org/queue.v1.min.js"></script-->
  <!--script src="http://spin.js.org/spin.min.js"></script-->
  <script type="text/javascript" src="js/countdown.js"></script>
  <script type="text/javascript" src="js/clientside.js"></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/bootstrap-select.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<?php
  $spreadsheet_url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSRilGb4rFjrpVBhE_WU62jWGB-_qyQ4XU0N9ChGqV4FOxMoPTCtjjqQtpkMP_WVz4q42prGjvQLpP4/pub?gid=1799807314&single=true&output=csv";

  if(!ini_set('default_socket_timeout', 15)) echo "<!-- unable to change socket timeout -->";
  if (($handle = fopen($spreadsheet_url, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
      $spreadsheet_data[] = $data;
    }
    fclose($handle);
  }
  else
    die("Problem reading csv");

  echo "<script>\nvar funds = {};\n";
  foreach ($spreadsheet_data as $row){
    $key = $row[0];
    $value = $row[1];
    if ($key == "deadline" || $key == "start_date")
      echo "funds[\"$key\"]=\"$value\";\n";
    else {
      $value = str_replace(",","",$value);
      echo "funds[\"$key\"]=$value;\n";
    }
  }
  echo "</script>\n";
?>

<body>
  <div class="container content-left">
    <div class="row" style="margin-top: 0px;">
      <div class="col-sm-10">
        <img src="grounds.jpg" style="width: 100%;">
        <h1 class="display-3">Allen School espresso room<small class="text-muted"><br />Keeping CSE caffeinated</small></h1>
        <p><em>Quick links:</em>&nbsp;
          <!--a href="https://developer.amazon.com/alexaprize" target="_blank">[Alexa Prize website]</a>
          &nbsp;-->
          <a href="" data-target="#contactUs" data-toggle="collapse" onclick="return false;">[contact us]</a>
          &nbsp;
          <a href="https://goo.gl/forms/VQHlplSSO4Azqjzl2">[usage survey]</a>
          &nbsp;
          <a href="http://dada.cs.washington.edu/coffeecam/nphMotionJpeg?Resolution=640x480&Quality=Clarity">[espresso cam]</a>
        </p>
        <div id="contactUs" class="collapse">
          <p>
            Contact the espresso management team at <a href="mailto:espresso@cs.washington.edu">this email address</a>.
          </p>
          <hr>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-9 col-md-7">
        <div class="row"><div class="col-sm-12">
          <p>
            The Allen School espresso room (located in CSE 222) has been around for over 20 years, caffeinating students, staff, postdocs and faculty.
          </p>
          <h3>Fundraising
            <!--small><a href="" data-target="#howDoesItWork" data-toggle="collapse" onclick="return false";>[expand]</a></small-->
          </h3>

          <div id=countdown-wrap>
            <div id="goal">$0</div>
            <div id="glass">
              <div id="progressSchool">
                &nbsp;&nbsp;Allen School contribution
              </div>
              <div id="progress">
                &nbsp;&nbsp;Donations
              </div>
            </div>
            <!--div class="goal-stat">
              <span class="goal-number" id="raised_school"></span>
              <span class="goal-label">Gifted</span>
            </div-->
            <div class="goal-stat">
              <span class="goal-number" id="raised_pct"></span>
              <span class="goal-label">Funded</span>
            </div>
            <div class="goal-stat">
              <span class="goal-number" id="raised_dollars"></span>
              <span class="goal-label">Raised</span>
            </div>
            <div class="goal-stat">
              <span class="goal-number" id="remaining"></span>
              <span class="goal-label">Needed</span>
            </div>
            <div class="goal-stat">
              <span class="goal-number"><div id="countdown"></div></span>
              <span class="goal-label">to go</span>
            </div>

          </div>
          <h4>How to donate</h4>
          <p>Donations help cover costs for beans, milk, supplies, and maintenance. Here's how you can donate to the espresso room:
            <ol>
              <li>In good old fashioned cash:
                <ul>
                  <li>Through the Benson Store <br />(mark envelope "for espresso room" and put in locked box on the wall)</li>
                </ul>
              </li>
              <li>Using virtual money:
                <ul>
                  <li>Square Cash - <a href="http://cash.me/$EspressoRoom">cash.me/$EspressoRoom</a></li>
                  <li>Venmo - <a href="http://www.venmo.com/Espresso-Room">venmo.com/Espresso-Room</a></li>
                  <li>Paypal - <a href="http://paypal.me/uwcseespresso">paypal.me/uwcseespresso</a></li>
                </ul>
              </li>
            </ol>
          </p>
          <h4>How much to donate</h4>
          You can donate based on how much you actually use the espresso room.
          <p>
          Based on survey responses, the suggested <strong>quarterly</strong> donation follows this simple equation:
          $$ \text{donation} = 2.00 * \text{number espresso-based drinks per week} $$
          For instance, if you get 3 drinks/week, the suggested donation is $6/quarter. For 5 drinks/week, we suggest $10/quarter.
          </p>
          <em>
            Note: these guidelines are subject to change based on how fast we go through our stock.
            <strong>Help us figure this out by filling out our <a href="https://goo.gl/forms/VQHlplSSO4Azqjzl2">usage survey</a>.</strong>
          </em>
          <hr>

          <h3>Training
          </h3>
          <h4>You must complete training before using the espresso machine!</h4>
          <p><strong>Please <a href="https://goo.gl/forms/OZ5ygraB0wb73UeB2.">RSVP</a> for training.</strong> Regularly held trainings will be on <b>Mondays at 9:30-10AM</b> and <b>Fridays at 1-1:30PM</b>. If you cannot make either of these times, please RSVP and we will schedule a time with you.</p>
          <p>Our current trainers are Dmitri Danilov, Matthew Johnson, Naveena Karusala, and Esther Jang.</p>
          <hr>

          <h3>FAQs</h3>
          <h4>Does the Allen School help with funding?</h4>
          <div id="schoolFunds">
            The Allen School has generously offered to help with funding the espresso room, similar to how it helps fund TGIFs.
            The school donate up to $500 per quarter, which covers about half of the quarterly costs of running the room.
          </div>
          <h4>Who's managing the room?
            <!--small><a href="" data-target="#who" data-toggle="collapse" onclick="return false";>[expand]</a></small-->
          </h4>
          <div class="" id="who">
            Grad and staff volunteers at Allen School:
            <ul>
              <li>Dmitri Danilov <small>(dmitri@cs)</small></li>
              <li>Emily Furst <small>(eafurst@cs)</small></li>
              <li>Srini Iyer <small>(sviyer@cs)</small></li>
              <li>Esther Jang <small>(infrared@cs)</small></li>
              <li>Matthew Johnson <small>(matt9j@cs)</small></li>
              <li>Naveena Karusala <small>(naveenak@cs)</small></li>
              <li>Lucy Lin <small>(lucylin@cs)</small></li>
              <li>Ellis Michael <small>(emichael@cs)</small></li>
              <li>Maarten Sap <small>(msap@cs)</small></li>
              <li>James Wilcox <small>(jrw12@cs)</small></li>
            </ul>
            Staff point person:
            <ul>
              <li>Garrett Yoshitomi <small>(ggy2@cs)</small></li>
            </ul>
          </div>
          <h4>How do I avoid the line?</h4>
          <div>
            We have a handy camera setup <a href="http://dada.cs.washington.edu/coffeecam/nphMotionJpeg?Resolution=640x480&Quality=Clarity">here</a>.
            You can check whether there's a line before going down! Note that you need to be on the CSE-local wifi to access it.
          </div>
        </div></div>        
      </div>
      <div class="col-sm-3 col-md-3" style="margin-top: 20px;">
        <figure>
          <div class="img-div">
            <img class="figure-img img-fluid rounded" src="http://prima-coffee.com/sites/default/files/learn/espresso/espresso-milk-preview.jpg" alt="Team members standing on the UW campus" style="width: 100%;max-width:none;">
            <img class="hoverlarge" src="http://prima-coffee.com/sites/default/files/learn/espresso/espresso-milk-preview.jpg" alt="Team members standing on the UW campus" style="left:-120px;top:-75px; border-radius: 0%;">
            <figcaption class="figure-caption">
              Latte art
            </figcaption>
          </div>
        </figure>
        <figure>
          <div class="img-div">
            <img class="figure-img img-fluid rounded" src="http://cafebritt.com/public/img/expierience/recipes-espresso.jpg" alt="Team photo at the alexa prize summit" style="width: 100%;max-width:none;">
            <img class="hoverlarge" src="http://cafebritt.com/public/img/expierience/recipes-espresso.jpg" alt="Team photo at the alexa prize summit" style="left: -120px; top: 85px; border-radius: 0%;">
            <figcaption class="figure-caption">
              Shots of espresso
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
    <hr>
    <div class="row" style="margin-bottom: 100px;">
      <div class="col-sm-12">
        Want to help? No problem!<br>
        Email <a href="mailto:espresso@cs.washington.edu">espresso@cs</a> or volunteer as part of the 
        <a href="http://abstract.cs.washington.edu/wiki/index.php/Gsc2017" target="_blank">GSC elections</a>.
      </div>
    </div>
  </div>  
</body>
