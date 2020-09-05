/*
 *  Stuff
 */

import { Canvas } from './canvas.js';

const myself = new Peer(null, {
  debug: 2,
});
let myId;
let connection;
var asd = new Canvas();

myself.on('open', function (id) {
  console.log('My peer Id is: ' + id);
  myId = id;
  console.log(myId);
});

myself.on('connection', function (playerConnection) {
  connection = playerConnection;
  console.log('Connected to: ' + connection.peer);
  listen();
});

function listen() {
  connection.on('open', function () {
    connection.on('data', function (data) {
      console.log(data);
      console.log('Data recieved');
    });
    connection.send('Connection Estabilished');
  });

  connection.on('close', function () {
    console.log('Connection Lost');
    connection = null;
  });
}

function getPlayerId() {
  const url = window.location.href;
  const Id = url.split('?userId=')[1];
  return Id;
}

function getMyId() {
  var input = document.createElement('input');
  input.setAttribute('value', myId);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}

function sendMessage() {
  var inputField = document.getElementById('myInput');
  var playerId = this.getPlayerId();
  console.log(playerId);
  const connection = myself.connect(playerId, { reliable: true });

  connection.on('open', function () {
    // Receive messages
    connection.on('data', function (data) {
      console.log('Received', data);
    });

    // Send messages
    console.log(inputField.value);
    connection.send(inputField.value);
  });
}
