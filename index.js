$(document).on("keypress", startGame);

var buttons = $(".btn");
var level = 1;
var sequence = [];
var colors = ["green", "red", "yellow", "blue"];
var picks = 0;

function startGame() {
  buttons.click(onButtonClick);
  addToSequence();
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
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

function onButtonClick(e) {
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
    $("h1").text("GAME OVER!");
    $("body").addClass("game-over");
  }
}
