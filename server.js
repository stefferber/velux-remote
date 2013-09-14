/*******************************************************************************
 * Copyright (c) 2013 Stefan Ferber.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Stefan Ferber - initial API and implementation and/or initial documentation
 *******************************************************************************/
/*******************************************************************************
 * node.js express REST API to remote control velux windows 
 * via the KMtronic USB 4 Relay Board RS232
 * sigma-shop.com/product/75/usb-4-relay-board-rs232-serial-controlled-pcb.html
 *******************************************************************************/

var express = require('express');
var app = express();
var serialport = require("serialport");

var myPortPath = "/dev/cu.usbserial-A101LV3L";

var portCmdShadesOpenStart = Buffer('FF0101', 'hex');
var portCmdShadesOpenEnd = Buffer('FF0100', 'hex');

var portCmdShadesCloseStart = Buffer('FF0201', 'hex');
var portCmdShadesCloseEnd = Buffer('FF0200', 'hex');

var portCmdWindowsOpenStart = Buffer('FF0301', 'hex');
var portCmdWindowsOpenEnd = Buffer('FF0300', 'hex');

var portCmdWindowsCloseStart = Buffer('FF0401', 'hex');
var portCmdWindowsCloseEnd = Buffer('FF0400', 'hex');

var portCmdRelayStatus = Buffer('FF0900', 'hex');

var portCmdShadesDelay = 0.5*1000;  //milliseconds
var portCmdWindowsDelay = 0.5*1000; //milliseconds

var myPort = new serialport.SerialPort(myPortPath, {
    baudrate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
//    parser: serialport.parsers.readline("\r\n")
});

myPort.on("open", function () {
  console.log("open serialport " +myPortPath);
});

//no global callback as data has to be fetched in context
//myPort.on("data", function(data) {
//  console.log("data received: " + data.toString());
//});  

myPort.on('error', function(err) {
  console.log(err);
});

myPort.on('close', function (err) {
    console.log('closed serialport' +myPortPath);
});


app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.get('/connectedhome/windows', function(req, res){
  myPort.write(portCmdRelayStatus, function(err, bytesWritten) {
    console.log("err: " + err);
    console.log("bytes successul written: "+ bytesWritten);
  });  

  myPort.on("data", function(data) {
    var windowStatus="Window status is unknown. Relais for window control are set";
//    for (var i = 0; i < data.length ; i++) {
//     if(data[i] == [0]);
//     }

      
    console.log("data received: " + dataReadFromPort);
  });  

  res.send('Window status is...');
});

app.get('/connectedhome/shades/open', function(req, res){
  myPort.write(portCmdShadesOpenStart, function(err, bytesWritten) {
    console.log("err: " + err);
    console.log("bytes successul written: "+ bytesWritten);
  });  

  setTimeout(function(){ 
    myPort.write(portCmdShadesOpenEnd, function(err, bytesWritten) {
      console.log("err: " + err);
      console.log("bytes successul written: "+ bytesWritten);
    })},  
    portCmdShadesDelay);
  res.send('Shades are opening...');
});

app.get('/connectedhome/shades/close', function(req, res){
  myPort.write(portCmdShadesCloseStart, function(err, bytesWritten) {
    console.log("err: " + err);
    console.log("bytes successul written: "+ bytesWritten);
  });  

  setTimeout(function(){ 
    myPort.write(portCmdShadesCloseEnd, function(err, bytesWritten) {
      console.log("err: " + err);
      console.log("bytes successul written: "+ bytesWritten);
    })},  
    portCmdShadesDelay);
  res.send('Shades are closing...');
});


app.get('/connectedhome/windows/open', function(req, res){
  myPort.write(portCmdWindowsOpenStart, function(err, bytesWritten) {
    console.log("err: " + err);
    console.log("bytes successul written: "+ bytesWritten);
  });  

  setTimeout(function(){ 
    myPort.write(portCmdWindowsOpenEnd, function(err, bytesWritten) {
      console.log("err: " + err);
      console.log("bytes successul written: "+ bytesWritten);
    })},  
    portCmdWindowsDelay);
  res.send('Windows are opening...');
});

app.get('/connectedhome/windows/close', function(req, res){
  myPort.write(portCmdWindowsCloseStart, function(err, bytesWritten) {
    console.log("err: " + err);
    console.log("bytes successul written: "+ bytesWritten);
  });  

  setTimeout(function(){ 
    myPort.write(portCmdWindowsCloseEnd, function(err, bytesWritten) {
      console.log("err: " + err);
      console.log("bytes successul written: "+ bytesWritten);
    })},  
    portCmdWindowsDelay);
  res.send('Windows are closing...');
});


app.listen(3000);
console.log('Listening on port 3000');


