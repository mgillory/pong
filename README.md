# Pong game
A fully functional pong game using html, css and js.

# Features of this version (1player-mode)

- 1-player mode
- Basic implementation of AI
- Collision with different deltas along the paddles
- No game menu options

# Reminders for next version

Beyond implementing keyboard control, game menu, 2player-mode and rethinking the whole UX and smoothness of the game, we can highlight two pieces of code that must be reviewed as well;  

# Randomize ball reset

```js
ballSpeedX = -ballSpeedX;
ballX = canvas.width / 2;
ballY = canvas.height / 2;
```

# Better AI

```js
if(paddle2Y + (PADDLE_HEIGHT/2) < ballY - 35)
  paddle2Y += 6;
else if(paddle2Y + (PADDLE_HEIGHT/2) > ballY + 35)
  paddle2Y -= 6;
```
