$(document).ready(function() {
    console.log("ready");


    //GLOBAL VARIABLES
    //==================================================

    var questionsArray = [
        {
        question: "What state were you wanting to visit?", 
        answers: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'  ]
    }, 
    {
        question: "What terrain are you looking for?",
        answers: ['desert', 'mountain', 'forest',]
        },
        {
        question: "What activity would you like to do?",
        answers: ['hiking', 'swimming', 'rock climbing', 'camping', 'fishing', 'star gazing'], 
    },
        {
        question: "Do you want to bring pets?",
        answers: ['yes', 'no'],
        },
        {
        question: "Are you traveling solo or with a group of people?",
        answers: ['solo', 'group of people'],
        },
];

    //FUNCTIONS
    //=================================================

    //MAIN

    $(".btn-begin").click(function() {
        $(this).hide();
        $("#ready").hide();
        console.log("clicked")
        questionsStart();
    });

    function questionsStart()
   {
       //TEST//Create div to add the questions to
   var randomQuestion = Math.floor(Math.random()*questionsArray.length);
   var questions = questionsArray[randomQuestion];
   questionsArray[randomQuestion] = questionsArray[0];



   var questionDiv = $("<div>");
   questionDiv.addClass("questionClass");
   questionDiv.attr('theQuestions', questions.question);
   questionDiv.append(questions.question);
   $(".stuff").append(questionDiv);

   var answerDiv = $("<div>");
   var answerArray = [];
   $(".stuff").append(answerDiv);
   for(var i = 0; i < questions.answers.length; i++){
       //Add Answer Div to HTML
       var answerOptionDiv = $("<div>");
    //    var addAnswer = $("<button>);
       answerOptionDiv.addClass("answerOptionDiv");
       answerOptionDiv.attr("answeranswer", questions.answers[i]);
       console.log(questions.answers[i]);
       answerOptionDiv.append(questions.answers[i]);
       answerArray.push(questions.answers[i]);
       $(answerDiv).append(questions.answers[i]);
   }    
   console.log(answerArray);
   console.log(questions.question);

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

  







