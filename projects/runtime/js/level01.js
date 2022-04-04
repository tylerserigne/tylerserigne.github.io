var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 90 },
                { "type": "sawblade", "x": 2000, "y": groundY - 90 },
                { "type": "sawblade", "x": 1200, "y": groundY - 90 },
                { "type": "sawblade", "x": 4200, "y": groundY - 90 },
                { "type": "sawblade", "x": 5200, "y": groundY - 90 },
                { "type": "sawblade", "x": 4800, "y": groundY - 90 },
                { "type": "sawblade", "x": 700, "y": groundY - 90 },
                { "type": "sawblade", "x": 1300, "y": groundY - 90 },
                { "type": "sawblade", "x": 1700, "y": groundY - 90 },
                { "type": "sawblade", "x": 2100, "y": groundY - 90 },
                { "type": "sawblade", "x": 2400, "y": groundY - 90 },
                { "type": "sawblade", "x": 2800, "y": groundY - 90 },
                { "type": "sawblade", "x": 4300, "y": groundY - 90 },
                { "type": "sawblade", "x": 4900, "y": groundY - 90 },
                { "type": "sawblade", "x": 5400, "y": groundY - 90 },
                { "type": "sawblade", "x": 6000, "y": groundY - 90 },
                { "type": "sawblade", "x": 6700, "y": groundY - 90 },

                { "type": "enemy", "x": 600, "y": groundY - 67 },
                { "type": "enemy", "x": 2200, "y": groundY - 67 },
                { "type": "enemy", "x": 3450, "y": groundY - 67 },
                { "type": "enemy", "x": 4450, "y": groundY - 67 },
                { "type": "enemy", "x": 5450, "y": groundY - 67 },
                { "type": "enemy", "x": 6450, "y": groundY - 67 },

              
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function drawOb (x,y) {
            var hitZoneSize = 5; //creates hitzone
            var damageFromObstacle = 20; //does damage 
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates object        
            sawBladeHitZone.x = x + 40; //position x of hitzone
            sawBladeHitZone.y = y; //position y of hitzone
            game.addGameItem(sawBladeHitZone);    
            var obstacleImage = draw.bitmap("img/sawblade.png"); //draws image 
            sawBladeHitZone.addChild(obstacleImage); //adds image to hitzone so we can see it
            obstacleImage.x = + 1;
            obstacleImage.y = - 10;
             sawBladeHitZone.rotationalVelocity = 0;
        };
//what was the code for that?
        function drawEnemy (x,y) {
            var enemy = game.createGameItem("enemy",25); // makes the enemy and stores a variable for it
            var obstacleImage = draw.bitmap("img/arg.png");//draws type 
            obstacleImage.x = -25; //positons image x
            obstacleImage.y = -25;//positions image y
            enemy.addChild(obstacleImage); 
            enemy.x = x; //positions the enemy as a whole x
            enemy.y = y;//positions the enemy as a whole y
            game.addGameItem(enemy);
            enemy.velocityX = -3; // determines the speed of the enemy
            enemy.rotationalVelocity = 0; //determines the rotation of the enemy
            enemy.onPlayerCollision = function() {  //determines what happens when the enemy hits player
                game.changeIntegrity(-20)  
                enemy.fadeOut(1000);             
            }
            enemy.onProjectileCollision = function() { //determines what happens when the player hits with projectile 
                enemy.fadeOut(1500);    
            }
        }



        function drawReward (x,y) {
            var enemy = game.createGameItem("reward",25); // makes the enemy and stores a variable for it
            var obstacleImage = draw.bitmap("img/fruit.png"); //determines the artist style of object
            obstacleImage.x = -25; //determines location of x
            obstacleImage.y = -25;// determines location of y
            enemy.addChild(obstacleImage);
            enemy.x = x;  //reused enemy code
            enemy.y = y - 20; //reused enemy code
            game.addGameItem(enemy);
            enemy.velocityX = -3; //determines speed
            enemy.rotationalVelocity = -2; //determines rotation speed
            enemy.onPlayerCollision = function() { //determines what happens when hit by player's body
                game.changeIntegrity(+40) //heals
                enemy.fadeOut(1000);             //disappears reward                
            }
            enemy.onProjectileCollision = function() { //determines what happens when the player hits with projectile 
                enemy.fadeOut(4000); 
                game.changeIntegrity(+20)   }

        }


            drawReward(1200,450);
        for (var i = 0;i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === "sawblade"){
                drawOb(gameItem.x,gameItem.y);
            }

            if (gameItem.type === "enemy"){
                drawEnemy(gameItem.x,gameItem.y);
            }

        }   






        // DO NOT EDIT CODE BELOW HERE
    }

};

     

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
