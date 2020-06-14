let player;
let obstacles = [];
let bonus = 0;
let malus = 0;
let finished;
let time = 12;


const obstacleTypes = [
  {
    image: "./images/coiffure.png",
    isGood: false,
    width: 200
  },
  {
    image: "./images/couture.png",
    isGood: false,
    width: 200
  },
  {
    image: "./images/dance.png",
    isGood: false,
    width: 200
  },
  {
    image: "./images/finance.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/football.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/infirmiere.png",
    isGood: false,
    width: 200
  },
  {
    image: "./images/ingenierie.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/police.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/pompier.png",
    isGood: true,
    width: 200
  },
  {
    image: "./images/science.png",
    isGood: true,
    width: 200
  }
];

var correctAnswer;
var correctAnswerImage = new Image();
correctAnswerImage.onload = function() {
  correctAnswer = true;
};
correctAnswerImage.src = "./images/correct.png";

var wrongAnswer;
var wrongAnswerImage = new Image();
wrongAnswerImage.onload = function() {
  wrongAnswer = true;
  
};
wrongAnswerImage.src = "./images/wrong.png";

var clock;
var clockImage = new Image();
clockImage.onload = function () {
  clock = true;
};
clockImage.src = "./images/time.png";

//------------------------------------------------------GAME CANVAS
const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;

//----------------------------------------------AUDIO

var winSound = new Audio('./audio/win.mp3');
winSound.volume = 0.2
winSound.play()

var loseSound = new Audio('./audio/cough.mp3');
loseSound.volume = 0.2
loseSound.play()

function draw() {
  //----------------------------------------------PLUIE DES METIERS
  if (frames % 90 === 0) {
    const randomIndex = Math.floor(Math.random() * obstacleTypes.length);
    const randomObstacle = obstacleTypes[randomIndex];
    const xesArray = [500, 800, 1100];
    const xIndex = Math.floor(Math.random() * xesArray.length);
    const x = xesArray[xIndex];
    obstacles.push(
      new Obstacle(
        x,
        randomObstacle.image,
        randomObstacle.width,
        randomObstacle.isGood
      )
    );
  }

  ctx.fillStyle = "rgb(46, 221, 123)";
  ctx.fillRect(0, 0, 1600, 1600);
  ctx.clearRect(0, 0, 1600, 1600);

  //-------------------------------------METIERS 

  //BONUS COMPTEUR
  ctx.fillStyle = "rgb(87, 205, 271)";
  ctx.fillRect(100, 800, 400, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Comic Sans MS";
  ctx.fillText(bonus, 300, 800, 250);
 

  if (correctAnswer) {
    ctx.drawImage(correctAnswerImage, 0, 600, 200, 200);
  }

  //MALUS COMPTEUR
  ctx.fillStyle = "rgb(255, 137, 30)";
  ctx.fillRect(1150, 800, 400, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Comic Sans MS";
  ctx.fillText(malus, 1300, 800, 250);
 

  if (wrongAnswer) {
    ctx.drawImage(wrongAnswerImage, 1400, 600, 200, 200);
  }
  

  //TEMPS
  time = 8 + Math.floor(frames / 200);
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, 500, 200);
  ctx.fillStyle = "black";
  ctx.font = "80px Comic Sans MS";
  ctx.fillText(" Time: " + time + "h", 150, 130, 350);    

  if (clock) {
    ctx.drawImage(clockImage,0, 0, 150, 150);
  }
    
  // JOUEUR-EUSE DESIN
  player.draw();
  obstacles.forEach(function(obstacle) {
    obstacle.draw();
    obstacle.y += 10;
  });

  // COLLISIONS & BONS ET MAUVAIS POINTS
  obstacles.forEach(function(obstacle, index) {
    if (obstacle.crashwith(player)) {
      if (obstacle.isGood) {
        bonus += 1;
      } else {
        malus += 3;
      }
      obstacles.splice(index, 1);
    }
  });

//------------------------------------- YOU WIN / YOU LOSE

  if (time >= 18) {
    finished = true;
    ctx.clearRect(0, 0, 1600, 1600);
    
    if (bonus >= malus) { //YOU WIN
      //WIN IMG
      var winImage = new Image();
      winImage.onload = function() {
        win = true;
        ctx.clearRect(0, 0, 1600, 1600);
        ctx.drawImage(winImage, 0, 0, 1000, 800);
      };
      winImage.src = "./images/win.png";
      // BONUS SCORE
      ctx.fillStyle = "rgb(87, 205, 271)";
      ctx.fillRect(100, 1400, 500, 200);
      ctx.fillStyle = "black";
      ctx.font = "150px Comic Sans MS";
      ctx.fillText(bonus + " CO2 Bonus", 200, 1550, 300);
      

      if (correctAnswer) {
         ctx.drawImage(correctAnswerImage, 0, 1300, 200, 200);
     }
      //MALUS SCORE
      ctx.fillStyle = "rgb(255, 137, 30)";
      ctx.fillRect(1150, 1400, 400, 200);
      ctx.fillStyle = "black";
      ctx.font = "100px Comic Sans MS";
      ctx.fillText(malus + " CO2 Malus", 1200, 1550, 250);

      if (wrongAnswer) {
        ctx.drawImage(wrongAnswerImage, 1400, 1300, 200, 200);
      }
      winSound.play()

    } else { // YOU LOSE
      //LOSE IMG
      var loseImage = new Image();
      loseImage.onload = function() {
        lose = true;
        ctx.clearRect(0, 0, 1600, 1600);
        ctx.drawImage(loseImage, 300, 0, 1000, 800);
      };
      loseImage.src = "./images/lose.png";

      //MALUS SCORE
      ctx.fillStyle = "rgb(255, 137, 30)";
      ctx.fillRect(1150, 1400, 500, 200);
      ctx.fillStyle = "black";
      ctx.font = "150px Comic Sans MS";
      ctx.fillText(malus + " CO2 Malus", 1200, 1550, 300);

      if (wrongAnswer) {
        ctx.drawImage(wrongAnswerImage, 1400, 1250, 200, 200);
      }
      //BONUS SCORE
      ctx.fillStyle = "rgb(87, 205, 271)";
      ctx.fillRect(100, 1400, 400, 200);
      ctx.fillStyle = "black";
      ctx.font = "100px Comic Sans MS";
      ctx.fillText(bonus + " CO2 Bonus", 200, 1550, 250);

      if (correctAnswer) {
        ctx.drawImage(correctAnswerImage, 0, 1300, 200, 200);
      }
      loseSound.play()
    }
  } 
}

// ---------------------------------------------MOVING

document.onkeydown = function(e) {
  switch (e.which) {
    case 38:
      player.speed();
      break;
    case 37:
      player.moveLeft();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
  }
};
document.onkeyup = function(e) {
  player.speedX = 0;
  player.speedY = 0;
};

//---------------------------------------------FRAMES
let raf;
let frames = 0;
function animLoop() {
  frames++;
  draw();
  if (!finished) {
    raf = requestAnimationFrame(animLoop);
  }
}
//------------------------------------------------RESET
function reset() {
  player = new Player();
  finished = false;
  time = 8;
  frames = 0;
  obstacles = [];
  bonus = 0;
  malus = 0;
  bonusSound = false;
  MalusSound = false;
}

// --------------------------------------------START GAME
function startGame() {
  if (raf) {
    cancelAnimationFrame(raf);
  }

  reset();

  raf = requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
  startGame();
};

