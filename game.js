var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}

function playSound(sound) {
  var sound = new Audio(`/SimonGame/sounds/${sound}.mp3`);
  sound.play();
}

function animatePress(currentColor) {
  var button = $(`.${currentColor}`);
  button.addClass("pressed");

  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (currentLevel === level - 1) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    var wrongSound = new Audio("/SimonGame/sounds/wrong.mp3");
    wrongSound.play();

    $("#level-title").text(`Game Over, Press Any Key To Restart`);

    var body = $("body");
    body.addClass("game-over");

    setTimeout(function () {
      body.removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  var button = $(`.${randomChosenColour}`);

  button.fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);
}

$(".btn").on("click", function () {
  var clickedButton = $(this);
  var userChosenColour = clickedButton.attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function () {
  if (!start) {
    $("#level-title").text(`Level ${level}`);
    start = true;
    nextSequence();
  }
});
