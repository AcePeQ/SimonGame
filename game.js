var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var start = false;

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

function checkAnswer(currentLevel) {}

function nextSequence() {
  $("#level-title").text(`Level ${level}`);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  var button = $(`.${randomChosenColour}`);

  button.fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);
}

$(".btn").on("click", function () {
  var clickedButton = $(this);
  var clickedButtonID = clickedButton.attr("id");

  var userChosenColour = clickedButtonID;
  userClickedPattern.push(userChosenColour);

  playSound(clickedButtonID);
  animatePress(clickedButtonID);
});

$(document).on("keydown", function () {
  if (!start) {
    start = true;
    nextSequence();
  }
});
