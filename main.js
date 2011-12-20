// Initialize when everything on the page is loaded
$(document).ready(function() {
 var canvas = document.getElementById("mycanvas");
 //check for support here:
 if (canvas.getContext){
  init();
 }
 else {
  //javascript fallback
  alert( "Sorry, your browser does not support the canvas element." );
 }
});
 
// Start the application
function init() {
 (function(oo) {
  oo.canvas('#mycanvas');  
 
  //settings
  var numballs;
  var radius = 26;
  var balls = [];
 
  function resetBalls() {
   //reset balls array
   balls.length = 0;
 
   //get new number of balls from user input
   numballs = $( '#numballs' ).val();
 
   for(var i = 0; i < numballs; i++) {
    /**
     * - Create each new ball as an image shape keeping
     * the circle properties for collision detection.
     * - Set coordinates and radius.
     * - Randomize starting velocity
     * - IMPORTANT: For image shapes always define visibility
     */
    var ball = oo.image({src:'../resources/ball.png',
          x: i * 100,
          y: i * 50,
          radius:radius,
          vx: Math.random() * 10 - 5,
          vy: Math.random() * 10 - 5,
          mass:radius,
          coord:'local',
          visible:true});
    //push each ball into the balls array
    balls.push(ball);
   }
  }
 
  resetBalls();
 
  //setting the invisible box boundaries (in this case the canvas)
  Bouncy.boundries = {
   left: 0 - radius, // HACK: boundaries correction for image shapes
   right: oo.canvas().width - radius,
   top: 0 - radius,
   bottom: oo.canvas().height - radius,
  };
 
  // Change the number of balls on button click event
  $( '#numBtn' ).click( function() {
   resetBalls();
  });
 
  //Animate is an endless loop
  oo.animate(function() {
   // check for wall collision
   for(var i = 0; i < numballs; i++) {
    var ball = balls[i];
    ball.modify({x: ball.x + ball.vx,
        y: ball.y + ball.vy});
    Bouncy.check_walls(ball);
   }
   //for each ball…
   for(i = 0; i < numballs; i++) {
    var ball_a = balls[i];
 
    //check for collisions with the current ball
    for(var j = i + 1; j < numballs; j++) {
     var ball_b = balls[j];
     Bouncy.check_collision(ball_a, ball_b);
    }
 
    //redraw the balls
    balls[i].draw();
   }
 
  //set "frames" and make sure to clear canvas
  }, '40fps', true);
 
 })($doodle);
}
