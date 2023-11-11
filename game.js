// test if jQuery loaded
// alert("tmd");
// $("h1").css("color", "purple");

// public variables and initiallization
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

// start game

$(document).on("keypress", function() {
    if (start === false) {
        nextSequence();
    }
    start = true;
})

$(".btn").on("click", function(event) {
    clickButton(event);

    // check if wrong
    if (!checkAnswer(userClickedPattern.length)) {
        console.log("gameover!");
        $("body").toggleClass("game-over");
        var audio = new Audio("./sounds/wrong.mp3")
        audio.play();
        setTimeout(function() {
            $("body").toggleClass("game-over");}
        , 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
    else if (userClickedPattern.length < gamePattern.length)
    {
        console.log("come on");
    } 
    else {
        console.log("level up!")
        nextSequence();
    }
});

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}

// note the clicked button and play sound and animation
function clickButton(event) {
    var userChosenColor = event.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
}

// to check if the answer user input correct
function checkAnswer(currentLevel) {
    for (var i = 0; i < currentLevel; i++) {
        // game over
        if (gamePattern[i] !== userClickedPattern[i]) {
            console.log("wrong");
            return false;
        } 
        // continue to check
        else {
            console.log("success");
        }
    }
    return true;
}

// add new button to the sequence
function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    // generate random color
    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);

    // reset user pattern
    userClickedPattern = [];
}

// play sound
function playSound(name) {
    var colorAudio = new Audio("./sounds/"+ name +".mp3")
    colorAudio.play();
}

// add animation to pressed key
function animatePress(currentColor) {
    var currentClass = $("#" + currentColor);
    currentClass.addClass("pressed");
    setTimeout(function() {
        currentClass.removeClass("pressed")}
    , 100);
}