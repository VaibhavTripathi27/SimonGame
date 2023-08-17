 
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var UserClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    UserClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(UserClickedPattern.length -1);
})



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === UserClickedPattern[currentLevel]){
        console.log("success");
    if (UserClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}

function nextSequence(){
    level++;
    UserClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomVariable = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomVariable];
    gamePattern.push(randomChosenColor);
    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}