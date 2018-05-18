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
        },
        {
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
    var answerOptionDiv;
    var addAnswer;

    pickQuestion();
    
    console.log(answerArray);
    console.log(questions.question);

    //CAPTURE ANSWER SELECTED BY USER AND SHOW NEXT QUESTION
    $("body").on("click", ".userChoice", function(){
        console.log(this);
        userChoice = $(this).attr("answeranswer");
        console.log("USER CHOICE IS: " + userChoice);
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
        questionDiv.append(questions.question);
        $(".stuff").append(questionDiv);
        showAnswers();
        } else(alert("YOU ARE DONE WITH QUESTIONS"));
    }
    

    function showAnswers() {
        answerDiv = $("<div>");
        $(".stuff").append(answerDiv);
        for(var i = 0; i < questions.answers.length; i++){
            //Add Answer Div to HTML
            answerOptionDiv = $("<div class='row answerOptionDiv'>");
            addAnswer = $("<div class='col-sm userChoice' <button>").text(questions.answers[i]);
            addAnswer.attr("answeranswer", questions.answers[i]);
            console.log(questions.answers[i]);
            answerArray.push(questions.answers[i]);
            console.log(addAnswer);
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

