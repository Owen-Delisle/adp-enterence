var url = "https://raw.githubusercontent.com/Owen-Delisle/adp-enterence/master/quiz.json";
var quizNumber;
var round = 0;
var json;
var answerButtonArr = ["b1", "b2", "b3", "b4"];
var score = 0;
var clicks = 0;
var percent = 0;


function loadJson() {
$.getJSON(url, function(text) {
        json = text['quizzes'];
        console.log(json);
        localStorage.setItem("json", JSON.stringify(json));
    });
}

function loadQuestions() {
    document.getElementById("correct").innerHTML = "";
    var localJson = JSON.parse(localStorage.getItem('json'));
    var quiz1 = localJson[0];
    var quiz2 = localJson[1];
        if (getQuizNumber() == 0) {
            document.getElementById("question").innerHTML = quiz1.questions[round].question;
            answerButtonArr.forEach(function(element, index){
                document.getElementById(element).innerHTML = quiz1.questions[round].answers[index].content;
                if(quiz1.questions[round].answers[index].value) {
                    document.getElementById(element).className = "correctButton";
                } else {
                    document.getElementById(element).className = "incorrectButton";
                }
            });
        } else { 
            document.getElementById("question").innerHTML = quiz2.questions[round].question;
            answerButtonArr.forEach(function(element, index){
                document.getElementById(element).innerHTML = quiz2.questions[round].answers[index].content;
                if(quiz2.questions[round].answers[index].value) {
                    document.getElementById(element).className = "correctButton";
                } else {
                    document.getElementById(element).className = "incorrectButton";
                }
            });
        }
}

function setQuizNumber(x) {
    localStorage.setItem("quizNumber", x);
}

function getQuizNumber() {
    return localStorage.getItem("quizNumber");
}

function addToRound(button) {
    if(button.className == "correctButton" && clicks < 3){
        score += 1;
        document.getElementById("score").innerHTML = score;
        document.getElementById("correct").innerHTML = "Correct!";
    } else if(button.className == "incorrectButton" && clicks < 3) {
        document.getElementById("correct").innerHTML = "Incorrect";
    }

    if(round < 2){
        // console.log(round); 
        round++;
        setTimeout(function(){
        loadQuestions();
        }, 2000);
    }

    if(clicks == 2) {
        localStorage.setItem("finalScore", score);
        setTimeout(function(){
            window.location = '../html/end-page.html';
        }, 2000);
    }

    console.log(clicks);
    clicks++;
}

function getScore() {
    var score = localStorage.getItem("finalScore")
    document.getElementById("finalScore").innerHTML = score;
    if((score / 3) * 100 > 50) {
        document.getElementById("grade").innerHTML = "Pass";
    } else {
        document.getElementById("grade").innerHTML = "Fail";
    }
}
