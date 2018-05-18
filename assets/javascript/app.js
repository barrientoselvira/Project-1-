$(document).ready(function() {
    console.log("ready");


    //GLOBAL VARIABLES
    //==================================================

    var questionsArray = [
        {
        question: "What state were you wanting to vist?", 
        answers: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS','MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI','WY'  ]
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
        }

];

    //FUNCTIONS
    //=================================================

    //MAIN

    $(".btn-begin").click(function() {
        $(this).hide();
        console.log("clicked")
        questionsStart();
    });

    function questionsStart()
    {
        //TEST//Create div to add the questions to 
    var randomQuestion = [Math.floor(Math.random()*questionsArray.lenth)];
    var questions = questionsArray[randomQuestion];
    console.log(questionsArray);

     

 
    var questionDiv = $("<div>");
    questionDiv.addClass("questionClass");
    questionDiv.attr('theQuestions', questionsArray.questions);
    questionDiv.append(questionsArray.question);
    $(".stuff").append(questionDiv);
    console.log(questionsArray.questions);

    var answerDiv = $("<div>");
    $(".stuff").append(answerDiv);
    for(var i = 0; i < questionsArray.length; i++){
        //Add Answer Div to HTML
        var answerOptionDiv = $("<div>");
        answerOptionDiv.addClass("answerOptionDiv");
        answerOptionDiv.attr("answeranswer", [i]);
        answerOptionDiv.append(questionsArray[i].question);
        $(answerDiv).append(answerOptionDiv);
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

  







// });
