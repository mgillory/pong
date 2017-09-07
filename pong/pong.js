var canvas;
var ctx;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 15;
var ballSpeedY = 3;

const PADDLE_THICKNESS = 15;
const PADDLE_HEIGHT = 100;
var paddle1Y;
var paddle2Y;

const WINNING_SCORE = 3;
var p1Score = 0;
var p2Score = 0;

var paused = false;

function handlePause(evt) {
    if(paused) {
        p1Score = 0;
        p2Score = 0;
        paused = false;
    }
}

window.onload = function() {
    canvas = document.getElementById("gc");
    paddle1Y = canvas.height/2 - PADDLE_HEIGHT/2;
    paddle2Y = canvas.height/2 - PADDLE_HEIGHT/2;
    ctx = canvas.getContext("2d");

    var fps = 30;
    setInterval(function() {
        move();
        draw();
    }, 1000/fps);

    canvas.addEventListener("mousedown", handlePause);

    canvas.addEventListener("mousemove", function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x : mouseX,
        y: mouseY
    };
}

function ballReset() {
    if(p1Score >= WINNING_SCORE || p2Score >= WINNING_SCORE) {
        paused = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function paddle2AI() {
    if(paddle2Y + (PADDLE_HEIGHT/2) < ballY - 35)
        paddle2Y += 6;
    else if(paddle2Y + (PADDLE_HEIGHT/2) > ballY + 35)
        paddle2Y -= 6;
}

function move() {
    if(paused)
        return;
    paddle2AI();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX < PADDLE_THICKNESS && (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT)) {
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
        ballSpeedY = deltaY * 0.35;
    }
    if (ballX > (canvas.width - PADDLE_THICKNESS) && (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT)) {
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
        ballSpeedY = deltaY * 0.35;
    }
    if(ballX < 0) {
        p2Score += 1;
        ballReset();
    }
    if(ballX > canvas.width) {
        p1Score += 1;
        ballReset();
    }
    if(ballY > canvas.height || ballY < 0)
        ballSpeedY = -ballSpeedY;
}

function drawDashedLines() {
    for(var i = 0; i < canvas.height; i += 41) {
        drawRect(canvas.width/2-5, i, 10, 23, "white");
    }
}

function drawRect(leftX, topY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(leftX, topY, width, height);
}

function drawCircle(cx, cy, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    ctx.fill();
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "black");

    if(paused) {
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";

        if(p1Score >= WINNING_SCORE)
            ctx.fillText("CONGRATS PLAYER 1!", 250, 100);
        else
            ctx.fillText("CONGRATS PLAYER 2!", 250, 100);

        ctx.fillText("CLICK TO CONTINUE!", 250, 500);

        return;
    }

    drawDashedLines();

    drawCircle(ballX, ballY, 8, "white");
    drawRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
    drawRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

    ctx.font = "bold 30px Georgia";
    ctx.fillText(p1Score, 200, 100);
    ctx.fillText(p2Score, canvas.width - 200, 100);
}