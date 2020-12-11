// Reference: Code adapted from week-11/activity# 13 - server6.js

// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes: 3xGET, 1xPOST, 1xDELETE
// GET: rest.sendFile(index.html)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// GET: res.sendFile(index.html)
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../notes.html')));

// GET: Return all saved notes as JSON from db.json
app.get('/api/notes', (req, res) => {
    res.json(characters)
});

// POST: Save a new note to db.json
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // const someVariable = req.body;

    // We then display the JSON to the users
    // res.json();
});

// DELETE: remove a note from db.json
app.delete('/api/notes/:id', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // const someVariable = req.body;

    // We then display the JSON to the users
    // res.json();
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));