/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
    "A": 65,
    "W": 87,
    "S": 83,
    "D": 68,
  }

  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;
  

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  $(document).on('keydown2', handleKeyDown2);
  $(document).on('keyup2', handleKeyUp2);
                             // change 'eventType' to the type of event you want to handle



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem();
    repositionGameItem();
    checkLocation();
  }
  
  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
      if (event.which === KEY.LEFT){
          speedX = -5;
      }

      if (event.which === KEY.RIGHT){
          speedX = 5;
    }
      if (event.which === KEY.UP){
        speedY = -5;

    }
      if (event.which === KEY.DOWN){
          speedY = 5;
    };

  }
  function handleKeyDown2(event) {
    if (event.which === KEY.A){
        speedX = -5;
    }

    if (event.which === KEY.D){
        speedX = 5;
  }
    if (event.which === KEY.W){
      speedY = -5;

  }
    if (event.which === KEY.S){
        speedY = 5;
  };

}
  function handleKeyUp(event) {

      if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
          speedX = 0;
      }

      if (event.which === KEY.UP || event.which === KEY.DOWN){
        speedY = 0;

    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  };
  
  function redrawGameItem(){
    $("#walker").css("left",positionX);
    $("#walker").css("top",positionY);
    $("#walker2").css("left2",positionX);
    $("#walker2").css("top2",positionY);
  };

  function checkLocation(){
      if (positionX > 400){
        speedX = -5;
        console.log(speedX);

      }

      if (positionX < 0){
        speedX = 5;
      }
      if (positionY < 0){
        speedY = 5;
        console.log(speedY)
      }
      if (positionY > 400){
        speedY = -5;
      }
  }


}

