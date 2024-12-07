let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let appleVisible = true;

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;
let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame() {
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 5) speed = 9;
    if (score > 10) speed = 11;

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    if (xVelocity === 0 && yVelocity === 0) return false;

    let gameOver = false;
    if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
        gameOver = true;
    }

    for (let part of snakeParts) {
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "12px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 70, 20);
}

function clearScreen() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    for (let i = 0; i < snakeParts.length; i++) {
        ctx.fillStyle = i % 2 === 0 ? "green" : "red";
        ctx.fillRect(snakeParts[i].x * tileCount, snakeParts[i].y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = "darkgreen";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX += xVelocity;
    headY += yVelocity;
}

function drawApple() {
    if (appleVisible) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    }
    appleVisible = !appleVisible;
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    if (event.keyCode == 38 && inputsYVelocity === 0) {
        inputsYVelocity = -1;
        inputsXVelocity = 0;
    }
    if (event.keyCode == 40 && inputsYVelocity === 0) {
        inputsYVelocity = 1;
        inputsXVelocity = 0;
    }
    if (event.keyCode == 37 && inputsXVelocity === 0) {
        inputsYVelocity = 0;
        inputsXVelocity = -1;
    }
    if (event.keyCode == 39 && inputsXVelocity === 0) {
        inputsYVelocity = 0;
        inputsXVelocity = 1;
    }
}

drawGame();


  