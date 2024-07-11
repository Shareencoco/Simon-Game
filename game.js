var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).keydown(function(){
  if(!started){

   $("h1").text("Level "+level);
   nextSequence();
   started=true;

  }
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
   
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");

    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){

      if(userClickedPattern.length===gamePattern.length){

        setTimeout(nextSequence,1000);

      }

    }

    else{

      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("h1").text("Game Over! Press Any Key to Restart")

      startOver();

    }
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}










 