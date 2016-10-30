"use strict";
const PORT = 3336;

//http server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const server = require("./lib/server");
app.use(express.static(__dirname + '/client'));

server.start(app, http, PORT);

const five = require('johnny-five');
let board = new five.Board({"repl":false});
//let board = new five.Board({ port: "/dev/tty.usbmodem1411" }, {"repl":false});
let led = null;
let touch = null;


board.on("ready", function() {
  console.log("hello board");
  led = new five.Led(13);
  touch = new five.Button(4);
  led.on();
  touch.on("press", function() {
	  led.on();
	  console.log("touched");
	});
	touch.on("release", function() {
	  led.off();
	  console.log("released");
	});
});

io.sockets.on('connection', socket => {
  console.log("hello socket");
	socket.on('ledStatus', status => {
		if (status) {
			console.log("Led on!!!");
			led.on();
		} else {
			console.log("Led off...");
			led.stop().off();
		}
	});
});

