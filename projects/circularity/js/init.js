var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;
        var circles = [];

        // TODO 2 : Create a function that draws a circle 
        function drawCircle() { 
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2); // calls random circle
            physikz.addRandomVelocity(circle, canvas,10,10); //adds random velocity
            view.addChild(circle); //add circle
            circles.push(circle); //push method pushes individual circles array
        }
        // TODO 3 / 8 : Call the drawCircle() function 

            
         //   drawCircle([0]); creates one circle and adds one number to the array
         //   drawCircle([1]);
         //   drawCircle([2]);
         //   drawCircle([3]);
         //   drawCircle([4]);


         for (var i = 0; i <= 500 ; i++){ //creates a loop to repeat the creation of circles as many times as specified 
            drawCircle(i);  //draws circles like 36 except connected to the loop
        }
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
         //   physikz.updatePosition(circles[0]) updates the position of one part of the array established on line 36
         //   physikz.updatePosition(circles[1])
         //   physikz.updatePosition(circles[2])
         //   physikz.updatePosition(circles[3])
         //   physikz.updatePosition(circles[4])

            
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
          //  game.checkCirclePosition(circles[0]); Checks the position of the circle based on the array established on line 36
          //  game.checkCirclePosition(circles[1]);
          //  game.checkCirclePosition(circles[2]);
          //  game.checkCirclePosition(circles[3]);
          //  game.checkCirclePosition(circles[4]);
            



            // TODO 9 : Iterate over the array
            for (var k = 0; k <= circles.length - 1; k++){  //Creates a loop to repeat code on 57 and 66
                physikz.updatePosition(circles[k])   //line 57 connected to loop that is connected to the length of the arrray of 43
                game.checkCirclePosition(circles[k]);  //line 66 connected to loop that is connected to the length of array of 43
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT

            if ( circle.x > canvas.width ) { //checks if circles are past the right side
                circle.x = 0;
            }
            if ( circle.x < 0 ) {   //checks if circles are past the left border 
                circle.x = canvas.width;
            }
            if ( circle.y > canvas.height) { //checks if circles are past the top of the border 
                circle.y = 0;
            }
            if ( circle.y < 0) {  //checks if circles are past the bottom of the border
                circle.y = canvas.height;
            }

            // TODO 7 : YOUR CODE STARTS HERE //////////////////////



            // YOUR TODO 7 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
