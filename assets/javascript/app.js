

$(document).ready(function() {

    function showMenu(){
        $(this).hide();
        // $("#state").selectMenu();
        var options = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'];
        var createDrop = $("<select name='stateAbb' id='state'>")
    
        createDrop.change(function(){
            var selectedOption = $('#state>option:selected');
            console.log(selectedOption.val());
            // $(".state-container").html('Value =' + selectedOption.val() + ", Text = " + selectedOption.text());
             });

        for(var i = 0; i < options.length; i ++){
            var addOption = $("<option>")
            addOption.text(options[i]);
            console.log(options[i]);
            console.log(addOption);
            createDrop.append(addOption);
            // $('options option:selected');
            // console.log(options[i]);
        }
          $('#options:selected').text();
          $(".state-container").append(createDrop);
     };
 
    //  showMenu();


        //  $("#state").change(function(){
        // var selectedOption = $('#state>option:selected').text();
        // console.log(selectedOption);
        // $(".state-container").html('Value =' + selectedOption.val() + ", Text = " + selectedOption.text);
        //  });
//     var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response.data);         
//     });

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
        questionsStart();
        showMenu();

    });

    function questionsStart()
    {
       //TEST//Create div to add the questions to
    var randomQuestion;
    var questions = [];
    var questionDiv;
    var answeredQuestionsArray = [];
    var answerDiv;
    var answerArray = [];
    var userChoice;
    // var userAnswers = [];
    var userAnswers = [];
    var answerOptionDiv;
    var addAnswer;
    var finishedAnswer;
    var stateDropDiv;
    

    pickQuestion();
    
    console.log(answerArray);
    console.log(questions.question);

    //CAPTURE ANSWER SELECTED BY USER AND SHOW NEXT QUESTION
    $("body").on("click", ".userChoice", function(){
        console.log(this);
        userChoice = $(this).attr("answeranswer");
        console.log("USER CHOICE IS: " + userChoice);
        var choiceObj = {
            id: $(this).parent().parent().find(".questionClass").attr("data-id"),
            choice: userChoice
        };

        userAnswers.push(choiceObj);
        console.log(choiceObj);
        console.log("Here is the users answers: " + userAnswers);
        $(".stuff").empty();

        
        pickQuestion();
    })

     //FUNCTIONS
    //=================================================

    
    //FUNCTION TO PICK A QUESTION
    function pickQuestion() {
        console.log("THIS IS # ANSWERED: " + answeredQuestionsArray.length);
        if (answeredQuestionsArray.length !== 5) {
        randomQuestion = Math.floor(Math.random()*questionsArray.length);
        questions = questionsArray[randomQuestion];
        questionsArray[randomQuestion] = questionsArray[0];
        answeredQuestionsArray.push(questions.question);
        questionsArray.shift()
        
        console.log("QUESTIONS ARRAY: " + questionsArray);
        console.log("ANSWERED QUESTIONS: " + answeredQuestionsArray);

        questionDiv = $("<div>");
        questionDiv.addClass("questionClass");
        questionDiv.attr('theQuestions', questions.question);
        questionDiv.attr("data-id", questions.id);
        questionDiv.append(questions.question);
        $(".stuff").append(questionDiv);
        showAnswers();
        } else(displayInfo());
        
    //FUNCTION FOR DROPDOWN MENU
  



    
    //FUNCTION TO DISPLAY PARK INFO
    function displayInfo() {
        var state = "";

        
        for (var i=0; i < userAnswers.length; i++) {
            if (userAnswers[i].id === "state") {
                state = userAnswers[i].choice;
            }
        }

        var queryURL2 = "http://www.astropical.space/astrodb/api-ephem.php?lat=35&lon=139";
       $.ajax({
           url: queryURL2,
           method: "GET"
         }).then(function(response2) {
             createPlanetTable();
             console.log(JSON.parse(response2));
             var data2 = JSON.parse(response2);
           
             for (var i=0; i < data2.response.length; i++) {
                 console.log(data2.response[i].name, data2.response[i].const, data2.response[i].au_earth);

                 var tBody = $("tbody");
                 var tRow = $("<tr>");

                 var planetNameTd = $("<td>").text(data2.response[i].name);
                 var constellationNameTd = $("<td>").text(data2.response[i].const);
                 var distance = $("<td>").text(data2.response[i].au_earth);

                 tRow.append(planetNameTd, constellationNameTd, distance);
                 tBody.append(tRow);
             }
         
         });


        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + selectedOption + "&fields=images&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);  
            // finishedAnswer = response.data;
            for(var j = 0; j < response.data.length; j++ ){
            console.log("This is the finished answer: " + response.data[j].description);
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
            });

        // var response = response.data;
        // $(".stuff").append(finishedAnswer);
    }}

    //CREATES TABLE
   function createPlanetTable() {
    planetTable = $("<div class='card card-primary'><div class='card-heading'><h3 class='card-title'><strong>PLANETS</strong></h3></div><div class='card-body'><table class='table table-hover' id='planetInfo'><thead><tr><th>Planet Name</th><th>Constellation Name</th><th>Distance</th></tr></thead><tbody></tbody></table></div></div>")
    $(".park-information").append(planetTable);
}

    function showAnswers() {
        answerDiv = $("<div>");
        $(".stuff").append(answerDiv);
        for(var i = 0; i < questions.length; i++){
            //Add Answer Div to HTML
            answerOptionDiv = $("<div class='row answerOptionDiv'>");
            addAnswer = $("<div class='col-sm userChoice' <button>").text(questions.answers[i]);
            addAnswer.attr("answeranswer", questions.answers[i]);
            // console.log(questions.answers[i]);
            answerArray.push(questions.answers[i]);
          
            // console.log(addAnswer);
            $(answerOptionDiv).append(addAnswer);
            $(".stuff").append(answerOptionDiv);
        }    
    }

    
        // .append(="<img src=" + );
        }
    })

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

    