var selectedOption = null;
$(document).ready(function() {
    function showMenu(){
        $(this).hide();
        // $("#state").selectMenu();
        var options = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'];
        var createDrop = $("<select name='stateAbb' id='state'>")
    
        createDrop.change(function(){
            $(".stuff").empty();
            selectedOption = $('#state>option:selected').text();
            console.log(selectedOption);
            // $(".state-container").html('Value =' + selectedOption + ", Text = " + selectedOption);
            // var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectedOption + "&fields=images&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
            // $.ajax({
            //     method: "GET",
            //     url: queryURL
            // }).then(function(response){
            //     console.log("STATE");
            //     console.log(response);
            // })
            displayInfo();
            
        });
        for(var i = 0; i < options.length; i ++){
            var addOption = $("<option>")
            addOption.text(options[i]);
            createDrop.append(addOption);
            // $('options option:selected');
            // console.log(options[i]);
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
    
    {
    //TEST//Create div to add the questions to

    var answerDiv;
    var answerArray = [];
    var userChoice;
    var userAnswers = [];
    var answerOptionDiv;
    var addAnswer;
    var finishedAnswer;
    var stateDropDiv;
    var createList;
    // var createName;
    
    
    
    //FUNCTIONS
    //=================================================
    
    //FUNCTION TO DISPLAY PARK INFO
    function displayInfo() {
        var state = "";
        
    //     var queryURL2 = "http://www.astropical.space/astrodb/api-ephem.php?lat=35&lon=139";
    //    $.ajax({
    //        url: queryURL2,
    //        method: "GET"
    //      }).then(function(response2) {
    //          createPlanetTable();
    //          console.log(JSON.parse(response2));
    //          var data2 = JSON.parse(response2);
           
    //          for (var i=0; i < data2.response.length; i++) {
    //              console.log(data2.response[i].name, data2.response[i].const, data2.response[i].au_earth);
    //              var tBody = $("tbody");
    //              var tRow = $("<tr>");
    //              var planetNameTd = $("<td>").text(data2.response[i].name);
    //              var constellationNameTd = $("<td>").text(data2.response[i].const);
    //              var distance = $("<td>").text(data2.response[i].au_earth);
    //              tRow.append(planetNameTd, constellationNameTd, distance);
    //              tBody.append(tRow);
    //          }
         
    //      });
        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectedOption + "&fields=images&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);  
            console.log("Number: " + response.data.length);
            
            var dataArray = [];
            // createList = $("<div class='parkList'>")
            
            for (var k = 0; k < 25; k++) {
                console.log(response.data.length);
                console.log(response.data[k])
                dataArray.push(response.data[k]);
                console.log(dataArray);

                var createName = $("<button class='parkButton'>");
                createName.text(response.data[k].name);
                createName.attr("data-name", response.data[k].name);
                createName.attr("data-description", response.data[k].description);
                if(response.data[k].images[0])  {
                    createName.attr("data-image", response.data[k].images[0].url);
                }
                // console.log(createName);
                $(".stuff").append(createName);

                
            }

            for (var z = 0; z < dataArray.length; z++) {
                console.log(dataArray);
                console.log(dataArray.length);
                console.log(dataArray[z].name);
                console.log(dataArray[z].description);
                console.log(dataArray[z].latLong)

                var latLongArray = [];
                var latLongString = dataArray[z].latLong;
                var latLong = latLongString.split(', ');
            
                console.log(latLong);
                console.log(latLong[0]);
                console.log(latLong[1]);
    
                var lat = latLong[0];
                var long = latLong[1];

                var latitude = lat.split(":")[1];
                console.log("Latitude: " + latitude);

                var longitude = long.split(":")[1];
                console.log("Longitude: " + longitude);
            

            }


            
            // for(var j = 0; j < response.data.length; j++ ){
            // console.log("This is the finished answer: " + response.data[j].description);
            // $(".park-information").append("<p>" + "<b>" + response.data[j].fullName + "</b>" + "</p>");
            // $(".park-information").append("<p>" + response.data[j].states + "</p>");
            // if(response.data[j].images[0]){
            //     var imgURL = response.data[j].images[0].url;
            //     var image = $("<img>").attr("src", imgURL);
            //     $(".park-information").append(image);
            // }
            // $(".park-information").append("<p>" + response.data[j].description + "</p>");
            // $(".park-information").append("<p>" + response.data[j].weatherInfo + "</p>");
            // }
            // });

        // var response = response.data;
        // $(".stuff").append(finishedAnswer);
    })

    //CREATES TABLE
    function createPlanetTable() {
        planetTable = $("<div class='card card-primary'><div class='card-heading'><h3 class='card-title'><strong>PLANETS</strong></h3></div><div class='card-body'><table class='table table-hover' id='planetInfo'><thead><tr><th>Planet Name</th><th>Constellation Name</th><th>Distance</th></tr></thead><tbody></tbody></table></div></div>")
        $(".park-information").append(planetTable);
    }
    

    //CAPTURE ANSWER SELECTED BY USER AND SHOW NEXT QUESTION
    $("body").on("click", ".parkButton", function(){
        console.log(this);
        userChoice = $(this).text();
        console.log("USER CHOICE IS: " + userChoice);
        var choiceObj = {
            name: $(this).attr("data-name"),
            description: $(this).attr("data-description"),
            image: $(this).attr("data-image")
        };
        
        // userAnswers.push(choiceObj);
        console.log(choiceObj);
        // console.log("Here is the users answers: " + userAnswers);
        $(".stuff").empty();
        
    })
        

}}})



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

