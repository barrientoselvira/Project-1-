$(document).ready(function() {
    // Check if element is scrolled into view
    function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    // If element is scrolled into view, fade it in
    
    window.sr = ScrollReveal();
    sr.reveal('.new-section');
    sr.reveal('icon');
    sr.reveal('.steps');
    sr.reveal('#ready');
    sr.reveal('.btn');
    });
   
   var selectedOption = null;
   var lat;
   var long;
   var latLongString;
   var latLong;
   var latidude;
   var longitude;
   
   $(document).ready(function() {
    function showMenu(){
    $(this).hide();
    // $("#state").selectMenu();
    var options = ['--', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'];
    var createDrop = $("<select name='stateAbb' id='state'>")
    
    createDrop.change(function(){
    $(".stuff").empty();
    $(".starInfo").empty();
    selectedOption = $('#state>option:selected').text();
    console.log(selectedOption);
    displayInfo();
    
    });
    for(var i = 0; i < options.length; i ++){
    var addOption = $("<option>")
    addOption.text(options[i]);
    createDrop.append(addOption);
    }
    $('#options:selected').text();
    $(".state-container").append(createDrop);
    };
   
    
    
    //GLOBAL VARIABLES
    //==================================================
    var questionsArray = [
    {
    id: "state",
    question: "What state were you wanting to vist?", 
    }, 
   ];
   
   
    //MAIN
    //=================================================
    $(".btn-begin").click(function() {
    $(this).hide();
    $(ready).hide();
    console.log("clicked")
    showMenu();
    });
   
    
   
    //Create div to add the questions to
   
    var answerDiv;
    var answerArray = [];
    var userChoice;
    var userAnswers = [];
    var answerOptionDiv;
    var addAnswer;
    var finishedAnswer;
    var stateDropDiv;
    var createList;
    var choiceObj;
    var latLongResponse;
    
    
    
    
    
    //FUNCTIONS
    //=================================================
    
    //FUNCTION TO DISPLAY PARK INFO
    function displayInfo() {
    
    var state = "";
   
    var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectedOption + "&fields=images&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response.data); 
    
    var dataArray = [];
    
    for (var k = 0; k < response.data.length; k++) {
    console.log(response.data[k])
    dataArray.push(response.data[k]);
    console.log(dataArray);
    latLongResponse = response.data[k].latLong
   
    var createName = $("<button class='parkButton'>");
    createName.text(response.data[k].name);
    createName.attr("data-name", response.data[k].name);
    createName.attr("data-description", response.data[k].description);
    createName.attr("data-latLong", response.data[k].latLong);
    if(response.data[k].images[0]) {
    createName.attr("data-image", response.data[k].images[0].url);
    }
    $(".stuff").append(createName);
   
    
    }
   
    for (var z = 0; z < dataArray.length; z++) {
    console.log(dataArray);
   
    latLongString = dataArray[z].latLong;
    latLong = latLongString.split(', ');
    
    console.log(latLong);
    
    latitude = latLong[0];
    longitude = latLong[1];
   
    latSplit = latitude.split(":")[1];
    console.log("Latitude: " + latSplit);
    console.log(latSplit);
    lat = latSplit;
    console.log(lat);
   
    longSplit = longitude.split(":")[1];
    console.log("Longitude: " + longSplit);
    console.log(longSplit);
    long = longSplit;
    console.log(long);
   
    }
    
    for(var j = 0; j < response.data.length; j++ ){
    $(".park-information").append("<p>" + "<b>" + response.data[j].fullName + "</b>" + "</p>");
    $(".park-information").append("<p>" + response.data[j].states + "</p>");
    if(response.data[j].images[0]){
    var imgURL = response.data[j].images[0].url;
    var image = $("<img>").attr("src", imgURL);
    $(".park-information").append(image);
    }
    $(".park-information").append("<p>" + response.data[j].description + "</p>");
    $(".park-information").append("<p>" + response.data[j].weatherInfo + "</p>");
    }
    
    })
   
    //FINAL DISPLAY
    function finalDisplay() {
    $(".stuff").empty();
   
    var finalTitle = $("<h2>").text(choiceObj.name);
    var finalImage = $("<img class='finalImage' src=" + choiceObj.image + ">")
    var finalDescription = $("<h5>").text(choiceObj.description);
    var latLongResponse = choiceObj.latLong;
   
    console.log(choiceObj.latLong);
    console.log(latLongResponse);
   
    var vars = latLongResponse.split(",");
    var lat = parseFloat(vars[0].split(":")[1]);
    var long = parseFloat(vars[1].split(":")[1]);
   
    $(".stuff").append(finalTitle);
    $(".stuff").append(finalImage);
    $(".stuff").append(finalDescription);
   
    
    console.log(lat);
    console.log(long);
    var queryURL2 = "https://cors-everywhere.herokuapp.com/http://www.astropical.space/astrodb/api-ephem.php?lat=" + lat + "&lon=" + long + "";
    console.log(queryURL2);
    $.ajax({
    url: queryURL2,
    method: "GET"
    }).then(function(response2) {
   
    $(".starInfo").empty();
    $(".map").hide();
   
    console.log(lat);
    console.log(long);
   
    console.log(JSON.parse(response2));
    var data2 = JSON.parse(response2);
   
   
    
    var latLongResponse = choiceObj.latLong;
    console.log(latLongResponse);
    if(latLongResponse !== undefined && !!latLong){
    var vars = latLongResponse.split(",");
    var lat = parseFloat(vars[0].split(":")[1]);
    var long = parseFloat(vars[1].split(":")[1]);
    var obj = {
    lat: lat,
    lng: long
    };
    var id= "Map" + Math.floor(Math.random()*10000);
    console.log(id);
    console.log(obj);
    $(".stuff").append("<p class='map' id='"+id+"'></p>");
    google.maps.event.addDomListener(window, "load", createMap(obj, id));
    
    }
   
    var linkURL = "https://www.fourmilab.ch/cgi-bin/Yoursky?z=1&lat=" + lat + "&ns=North&lon=" + long + "&ew=West"
    var link = $("<a href=" + linkURL + " target=_blank class=skyLink>SEE YOUR SKY</a>")
    var table = $("<table class='starTable'><thead><br><th>" + 'Planet Name' + "</th><th>" + 'Constellation Name' + "</th><th>" + 'Distance (AU)' + "</th></thead><tbody></tbody></table>")
    var tHead = $("tHead");
    var tTitle = $("<h2>Planet Information</h2>");
    tHead.append(tTitle);
    table.append(tHead);

   
    $(".starInfo").append(link);
    $(".starInfo").append(table);
    
    for (var i=0; i < data2.response.length; i++) {

    var tBody = $("tbody");
    var tRow2 = $("<tr>");
    var planetNameTd = $("<td>").text(data2.response[i].name);
    var constellationNameTd = $("<td>").text(data2.response[i].const);
    var distance = $("<td>").text(data2.response[i].au_earth);
    tRow2.append(planetNameTd, constellationNameTd, distance);
    tBody.append(tRow2);

    $(".starInfo").append(table);
    }
    window.sr = ScrollReveal();
    sr.reveal('h2');
    sr.reveal('.finalImage');
    sr.reveal('h5');
        
    });
    }
   
    //CREATE MAP
    function createMap(obj, id){

    var map = new google.maps.Map(document.getElementById(id), {
    center: obj,
    zoom: 9
    });
   
    // create a marker
    var marker = new google.maps.Marker({
    position: obj,
    map:map,
    mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    console.log("working");
 
    }
    function initMap() {
    }
   
    //CAPTURE ANSWER SELECTED BY USER AND SHOW NEXT QUESTION
    $("body").on("click", ".parkButton", function(){
    console.log(this);
    userChoice = $(this).text();
    console.log("USER CHOICE IS: " + userChoice);
    choiceObj = {
    name: $(this).attr("data-name"),
    description: $(this).attr("data-description"),
    image: $(this).attr("data-image"),
    latLong: $(this).attr("data-latLong")
    };
    

    console.log(choiceObj);

    finalDisplay();
    
    });
    
    
   
   }})
   
    
    //NAVBAR BUTTONS TO SCROLL
    //==================================================
    $(".home-click").click(function() {
    $("html, body").animate({
    scrollTop: $("#top").offset().top
    }, 800);
    })
    $(".about-click").click(function() {
    $("html, body").animate({
    scrollTop: $(".about-container").offset().top
    }, 800);
    })
    $(".getstarted-click").click(function() {
    $("html, body").animate({
    scrollTop: $(".questions-container").offset().top
    }, 800);
    })
