/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PADDLEL_WIDTH = $("#paddleLeft").width();
  const PADDLEL_HEIGHT = $("#paddleLeft").height();

  //KEY object that assigns the keynumbers numbers to their correlatiing keys
    //needs w, s, up, and down
    var KEY = {
      "UP": 38,
      "DOWN": 40,
      "W": 87,
      "S": 83,
      "minus": 56,
      "plus": 57,
    }
  // Game Item Objects

  function GameItem(x,y,speedX,speedY,id){
    var item = {
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    h: $(id).height(),
    w: $(id).width(),
    id: id, 

    }
    return item;
  } 

  var paddleLeft = GameItem(10,200,0,0,"#paddleLeft")
  var paddleRight = GameItem(BOARD_WIDTH - $("#paddleRight").width() - 10,200,0,0,"#paddleRight")
  var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT /2, (Math.random() > 0.5 ? -2 : 2), (Math.random() > 0.5 ? -2 : 2), "#ball");
  var score_1 = 0;
  var score_2 = 0;
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawItem(paddleLeft);
    drawItem(paddleRight);
    drawItem(ball);
    updateItem(paddleLeft);
    updateItem(paddleRight);
    updateItem(ball);
    checkPaddleLocation(paddleRight);
    checkPaddleLocation(paddleLeft);
    checkBallBounceLocation(ball);
    checkBallHitSide(ball);
    doCollide(paddleLeft,ball);
    doCollide(paddleRight,ball);
  }
  
  /* 
  Called in response to events.
  */
 function handleKeyDown(event){
    if (event.which === KEY.W){
      paddleLeft.speedY = -5; 
}
    if (event.which === KEY.S){
      paddleLeft.speedY = 5;
};
    if (event.which === KEY.UP){
      paddleRight.speedY = -5;
}
    if (event.which === KEY.DOWN){
      paddleRight.speedY = 5;

};
    if (event.which === KEY.plus){
      ball.speedX = ball.speedX + 20;
    }
    if (event.which === KEY.minus){
  ball.speedX = ball.speedX - 20;
}
}

 function handleKeyUp(event) {

  if (event.which === KEY.W || event.which === KEY.S){
    paddleLeft.speedY = 0;
}
  if (event.which === KEY.UP || event.which === KEY.DOWN){
    paddleRight.speedY = 0;
}

}

  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
function drawItem(obj){
  $(obj.id).css("top",obj.y); //draws an object in the new location of the y axis
  $(obj.id).css("left",obj.x); //draws an object in the new location of the x axis 
}

function updateItem (obj){
  obj.x = obj.x + obj.speedX;
  obj.y = obj.y + obj.speedY;
}

//function that creates boundries of top and bottm walls

//function that creates boundries of left and right walls
    //ball doesnt bounce but it awards a point to the other player
    // ball resets to middle

//function that checks boundaries for paddes (top/bottom)
  function checkPaddleLocation(obj){
      if (obj.y > BOARD_HEIGHT - obj.h){
        obj.y =  BOARD_HEIGHT - obj.h;
      }
      if (obj.y < 0){
        obj.y = 0;
      }

  }

//function that will handle where the ball bounces instead of scores
function checkBallBounceLocation(obj){
  if (obj.y > BOARD_HEIGHT - obj.h){
    obj.speedY =  -1;
  }
  if (obj.y < 0){
    obj.speedY = 1;
  }
}

//function that will handle what happens when a player scores
function checkBallHitSide(obj){
  if (obj.x > BOARD_WIDTH - obj.w){
    obj.x = BOARD_WIDTH/2;
    obj.y = BOARD_HEIGHT/2;
    obj.speedY = obj.speedY * -1;
    obj.speedX = 2;
    score_2 = score_2 + 1;
    console.log(score_2);
  }
  if (obj.x < 0){
    obj.speedX = 2;
    obj.x = BOARD_WIDTH/2;
    obj.y = BOARD_HEIGHT/2;
    obj.speedX = obj.speedX * -1;
    score_1 = score_1 + 1;
    //add score to player_1
  }
}
//function that displays score

//function that will handle winner instance

//display play again button when winner wins

//do collide function to determine if paddles hit ball
function doCollide(paddle,ball){
  paddle.leftX = paddle.x;
  paddle.rightX = paddle.x + paddle.w;
  paddle.topY = paddle.y;
  paddle.bottomY = paddle.y + paddle.h;

  ball.leftX = ball.x;
  ball.rightX = ball.x + ball.w;
  ball.topY = ball.y;
  ball.bottomY = ball.y + ball.h;

  if (ball.rightX > paddle.leftX &&
    ball.leftX < paddle.rightX &&
    ball.bottomY > paddle.topY &&
    ball.topY < paddle.bottomY){

    ball.speedX = ball.speedX * -1;
      if (ball.speedX < 0){
        ball.speedX = ball.speedX - 2;
      }
      if (ball.speedX > 0){
        ball.speedX = ball.speedX + 2;
      }
    console.log(ball.speedX);
    ball.speedX = ball.speedX ;
  }





}

//cheats 




//function that changes ball's speed

//function that will handle what happens when the ball hits the paddle
  //changes direction 
  //changes speed
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
