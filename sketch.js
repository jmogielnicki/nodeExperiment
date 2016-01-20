

// Keep track of our socket connection
var socket;

var transp = 100;

var thisPositionsList = [];
var otherPositionsList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  // JM/AP - we took out the 'http: localhost' because 
  // we were getting an error and the internet said that's a fix
  socket = io.connect();
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  // JM - We can do this in setup because the socket will always be listening, no need to have it in draw.
  socket.on('mouseTest',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      otherPositionsList.push([data.x, data.y])

      // Draw a blue circle
      // fill(0,0,255);
      // noStroke();
      // ellipse(data.x,data.y,10,10);
    }
  );
}

function draw() {
  background(0);
  fill(242,242,111)
  for (i in thisPositionsList) {
    thisPosition = thisPositionsList[i]
    ellipse(thisPosition[0],thisPosition[1],10,10);
  }
  fill(255,130,58)
  for (i in otherPositionsList) {
    otherPosition = otherPositionsList[i]
    ellipse(otherPosition[0]-random(1),otherPosition[1] - random(1),10,10);
  }

}

function mouseDragged() {
  thisPositionsList.push([mouseX, mouseY])
  // Draw some white circles
  fill(255, 255, 255, 30);
  noStroke();

  ellipse(mouseX,mouseY,10,10);
  // Send the mouse coordinates
  // sendmouse(mouseX,mouseY);
  sendPositionList(mouseX, mouseY)
}

// Function for sending to the socket
function sendPositionList(xPos, yPos) {
  console.log("sendMouse: " + xPos + ' ' + yPos);

  // making object to send
  var data = {
    x: xPos,
    y: yPos
  };

  socket.emit('mouseTest', data);
}

// Function for sending to the socket
// function sendmouse(xpos, ypos) {
//   // We are sending!
//   console.log("sendmouse: " + xpos + " " + ypos);
  
//   // Make a little object with  and y
//   var data = {
//     x: xpos,
//     y: ypos
//   };

//   // Send that object to the socket
//   socket.emit('mouseTest',data);
// }