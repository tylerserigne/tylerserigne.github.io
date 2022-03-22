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
                { "type": "sawblade", "x": 400, "y": 470 },
                { "type": "sawblade", "x": 800, "y": 470 },
                { "type": "sawblade", "x": 1200, "y": 470 },

                { "type": "enemy", "x": 400, "y": 50 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function drawOb (xOb, yOb,design,damage) {
        var hitZoneSize = 25; //creates hitzone
        var damageFromObstacle = damage; //does damage 
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//creates object        
        sawBladeHitZone.x = xOb; //position x of hitzone
        sawBladeHitZone.y = yOb; //position y of hitzone
        game.addGameItem(sawBladeHitZone);    
        var obstacleImage = draw.bitmap(design); //draws image 
        sawBladeHitZone.addChild(obstacleImage); //adds image to hitzone so we can see it
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.rotationalVelocity = 1;
        };

        function drawEnemy (sizeX,sizeY,design,speed) {
        var enemy = game.createGameItem(design,25); // makes the enemy and stores a variable for it
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = sizeX;
        enemy.y = groundY - sizeY;
        game.addGameItem(enemy);
        enemy.velocityX = speed;
        enemy.rotationalVelocity = -2;
        enemy.onPlayerCollision = function() {
        game.changeIntegrity(0)}
        enemy.onProjectileCollision = function() {
        enemy.fadeOut(100);    
        }
        }


        drawEnemy(400,50,'enemy',-3);
            
        for (var i = 0;i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === "sawblade"){
        drawOb(gameItem.x,gameItem.y,'img/sawblade.png',40);

            }

        }
        // DO NOT EDIT CODE BELOW HERE
    }

};
reward.onProkectileCollision = function() {
    console.log("Reward HIT");
    game.changeIntegrity(10);
     
}

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
