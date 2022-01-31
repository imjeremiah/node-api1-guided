const server = require('./api/server');

// // import the server and start it!
// const express = require('express'); // import express from 'express --> ES6 modules

// const server = express(); // instance of an express applicaiton

// server.get('/hello', (req, res) => { // an event handler for the get requests to '/'
//     res.json({ message: 'this is awesome!'}) // sending back a response
// });

// server.use('*', (req, res) => { // catch all, put it at the end of your endpoints!
//     res.status(404).json({ message: 'sorry, not found!' });
// })

server.listen(8000, () => { // only 1 program can use port 8000 at a time
    console.log('listening on port 8000'); // success callback
});