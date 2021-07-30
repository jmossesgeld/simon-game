$(document).on("keypress", startGame);

var buttons = $(".btn");
var level = 1;
var sequence = [];
var picks = 0;
var onGame = false;

function startGame() {
  if (onGame == false) {
    picks = 0;
    level = 1;
    sequence = [];
    onGame = true;
    buttons.click(onButtonClick);
    addToSequence();
  }
}

function addToSequence() {
  $("h1").text("Level " + level + ".");
  var rand = Math.floor(Math.random() * 4);
  sequence.push(rand);

  //animation display loop
  i = 0;
  var loopDisplay = setInterval(() => {
    if (i < sequence.length) {
      addAnimation(buttons[sequence[i]]);
      i++;
    } else {
      clearInterval(loopDisplay);
    }
  }, 2000 / level);

  //increase level
  level++;
}

function addAnimation(button) {
  var audio = new Audio(`sounds/${button.getAttribute("id")}.mp3`);
  audio.play();
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function onButtonClick(e) {
  if (onGame) {
    addAnimation(this);
    index = buttons.index(this); //find index of button clicked
    if (sequence[picks] == index) {
      //check if the button clicked with the correct sequence
      if (sequence.length - picks == 1) {
        //check if last sequence
        picks = 0;
        addToSequence();
      } else {
        picks++;
      }
    } else {
      //game over
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("h1").text("GAME OVER!");
      $("body").addClass("game-over");
      onGame = false;
    }
  }
}
