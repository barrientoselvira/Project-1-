
$(document).ready(function() {
    console.log("ready");

    //GLOBAL VARIABLES
    //==================================================

    var questionsArray = [
        {
            id: "state",
        question: "What state were you wanting to vist?", 
        answers: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'  ]
    }, 
        {
            id: "activity",
        question: "What activity would you like to do?",
        answers: ['hiking', 'swimming', 'rock climbing', 'camping', 'fishing', 'star gazing'], 
    },
        {
            id: "pets",
        question: "Do you want to bring pets?",
        answers: ['yes', 'no'],
        },
        {
            id: "group",
        question: "Are you traveling solo or with a group of people?",
        answers: ['solo', 'group of people'],
        },
        {
            id: "terrain",
        question: "What type of terrain are you looking for?",
        answers: ['desert', 'mountain', 'forest'],
        }
];
    //MAIN
    //=================================================

    $(".btn-begin").click(function() {
        $(this).hide();
        console.log("clicked")
        questionsStart();
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
        
    
    //FUNCTION TO DISPLAY PARK INFO
    function displayInfo() {
        var state = "";

        
        for (var i=0; i < userAnswers.length; i++) {
            if (userAnswers[i].id === "state") {
                state = userAnswers[i].choice;
            }
        }


        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&fields=images&api_key=Hx0htuWoqYoNtx7Zr0h8tB9mDyAeiRNgBfEwRavS";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);  
            // finishedAnswer = response.data;
            for(var j = 0; j < response.data.length; j++ ){
                console.log("This is the finished answer: " + response.data[j].description);
                $(".stuff").append("<p>" + "<b>" + response.data[j].fullName + "</b>" + "</p>");
                $(".stuff").append("<p>" + response.data[j].states + "</p>");
                if(response.data[j].images[0]){
                    var imgURL = response.data[j].images[0].url;
                    var image = $("<img>").attr("src", imgURL);
                    $(".stuff").append(image);
                }
                $(".stuff").append("<p>" + response.data[j].description + "</p>");
                $(".stuff").append("<p>" + response.data[j].weatherInfo + "</p>");
                var latLong = response.data[j].latLong;
                $(".stuff").append("<p>" + response.data[j].latLong + "</p>");
                console.log(latLong);
                if(latLong !== undefined && !!latLong){
                    var vars = latLong.split(",");
                    var lat = parseFloat(vars[0].split(":")[1]);
                    var long = parseFloat(vars[1].split(":")[1]);
                    $(".stuff").append("<p>Lat: " + lat + ", Long: "+ long +"</p>");
                    var obj = {
                        lat: lat,
                        lng: long
                    };
                    
                    var id=  "Map" + Math.floor(Math.random()*10000);
                    console.log(id);
                    console.log(obj);
                    $(".stuff").append("<p class='map' id='"+id+"'></p>");
                    google.maps.event.addDomListener(window, "load", createMap(obj, id));
                    //createMap(obj,id);
                }
            }
            });

        // var response = response.data;
        // $(".stuff").append(finishedAnswer);
    }}


    function showAnswers() {
        answerDiv = $("<div>");
        $(".stuff").append(answerDiv);
        for(var i = 0; i < questions.answers.length; i++){
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

    function createMap(obj, id){
        // Create a map object and specify the DOM element
        // for display.
        var map = google.maps.Map(document.getElementById(id), {
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
        // $("<#map>").append(map);
    }

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
