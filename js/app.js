/*Variable declaration*/
var score = document.querySelector('.score'); /*HTML element for displaying score*/
var count = 0; /*Counter for updating score*/
 // Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png'; /*Enemy image*/
  this.x = -95; /*Starting x cordinate for the enemy*/
  this.yStartPos = [65, 145, 230]; /*All possible starting y cordinates for the enemy*/
  this.allSpeeds = [100, 180, 220]; /*Speed with which the enemy moves*/
  this.y = this.yStartPos[Math.floor(Math.random() * this.yStartPos.length)]; /*Selecting a random path for the enemy */
  this.speed = this.allSpeeds[Math.floor(Math.random() * this.allSpeeds.length)]; /*Selecting a random enemy speed*/
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);

  
  /*If the ennemy reaches end of the path, then move it to a randomly selected start position and assighn speed*/
  if (this.x > 505) {
    this.x = -83;
    this.y = this.yStartPos[Math.floor(Math.random() * this.yStartPos.length)];
    this.speed = this.allSpeeds[Math.floor(Math.random() * this.allSpeeds.length)];
  }

  /*If player collides with the enemy, then reset players position and score*/
  if (this.x < player.x + 60 &&
    this.x + 73 > player.x &&
    this.y < player.y + Resources.get(player.sprite).height/3 &&
    this.y + Resources.get(this.sprite).height/3 > player.y) {
    player.x = 201;
    player.y = 300;
	count = 0;
	score.innerText = `Score ${count}`;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png'; /*player image*/
    this.x = 202; /*Player's initial positions x cordinate*/
    this.y = 300; /*Player's initial positions y cordinate*/
  }

  /*If the player reaches the water then reset player's position and increment score*/
  update() {
	if (this.y < 51){
		this.x = 202;
		this.y = 300;
		
		count += 1;
		score.innerText = `Score ${count}`;
	}
  }

  /*Render player on the screen*/
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /*update player's postion according to the key pressed by the user*/
  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > 0) {
          this.x = this.x - 101;
        }
        break;

      case 'right':
        if (this.x < 303) {
          this.x = this.x + 101;
        }
        break;

      case 'up':
        if (this.y > 0) {
          this.y = this.y - 83;
        }
        break;

      case 'down':
        if (this.y < 380) {
          this.y = this.y + 83;
        }
        break;
    }
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player;
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
