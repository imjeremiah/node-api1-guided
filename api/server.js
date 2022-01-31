// IMPORTS AT THE TOP
const express = require('express');
const Dog = require('./dog-model.js');

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json()); // teaches express to read JSON

// ENDPOINTS
// [GET]    /             (Hello World endpoint)
server.get('/', (req, res) => { 
    res.status(200).json({ message: 'hey there'}) 
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {
    Dog.findAll()
    .then(dogs => {
        res.status(200).json(dogs)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: err.message });
    })
})
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', (req, res) => {
    Dog.findById(req.params.id)
        .then(dog => {
            dog ? res.status(200).json(dog) : res.status(404).json({ message: 'not found' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err.message });
        })
})
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res) => {
    const newDog = req.body;
    Dog.create(newDog)
        .then(dog => {
            res.status(201).json(dog)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err.message });
        })
})
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const result = await Dog.update(id, changes)
        res.status(200).json(result)
    } catch (err) {            
        console.error(err);
        res.status(500).json({ message: err.message });
    }
})
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', (req, res) => {
    Dog.delete(req.params.id)
    .then(dog => {
        dog ? res.status(200).json(dog) : res.status(404).json({ message: `dog ${req.params.id} not real!!` });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: err.message });
    })
})

server.use('*', (req, res) => {
    res.status(404).json({ message: 'sorry, not found!' });
})

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;