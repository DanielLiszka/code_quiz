//global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 25;
var timerInterval;
var score = 0;
var correct;

//html elements 
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizMain = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("name");
var highscoreDisplayName = document.getElementById("highscore-name");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("first");
var buttonB = document.getElementById("second");
var buttonC = document.getElementById("third");
var buttonD = document.getElementById("fourth");

function beginQuiz(){
    gameoverDiv.style.display = "none";
    startQuizMain.style.display = "none";
    cycleQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

function cycleQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

submitScoreBtn.addEventListener("click", function highscore(){
    
    var HighScoresStored = JSON.parse(localStorage.getItem("HighScoresStored")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
        name : currentUser,
        score : score
    };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    
    HighScoresStored.push(currentHighscore);
    localStorage.setItem("HighScoresStored", JSON.stringify(HighScoresStored));
    createHighScores();

    
});

function confirmAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        cycleQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect.")
        timeLeft = timeLeft - 3;
        currentQuestionIndex++;
        cycleQuestion();
    } else {
        showScore(); }
    if (timeLeft <= 0){
        showScore();
    }
}

function createHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("HighScoresStored")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizMain.style.display = "flex";
    timeLeft = 25;
    score = 0;
    currentQuestionIndex = 0;
}

startQuizButton.addEventListener("click",beginQuiz);