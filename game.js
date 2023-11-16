var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//function that tracks when a key is pressed. 
//After the key is pressed the game will start by calling nextSequence and the h1 will change depending on the level.
$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});


//Records which button was clicked through their #id. 
//This will then calls animatePress, sound and will check their press against checkAnswer.
$(".btn").click(function() {
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});


//Changes the h1 title to match current level. Increaes the level var and resets the userClickedPattern array.
//Selects a random colour and pushes that into the gamePattern array.
function nextSequence() {
    level++;
    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
}



function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    }, 100)
}

//Checks that the userClickedPattern = the gamePattern array. Calls nextSequence if it matches(correct), calls startOver if wrong.
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } 
    }else {
            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game over, press any key to restart");
            startOver();
        }
    
}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}





