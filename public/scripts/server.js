// Reference: Code adapted from week-11/activity# 13 - server6.js

// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// DB directory
const dbDirectory = path.resolve(__dirname, "../../db");

// Sets up the Express App
const app = express();
let PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes: 3xGET, 1xPOST, 1xDELETE
app.get('*', (req, res) => {
    console.log("PATH", req.path);
    switch (req.path) {
        case '/':
            // GET: rest.sendFile(index.html)
            res.sendFile(path.join(__dirname, '../index.html'));
            break;
        case '/notes':
            // GET: res.sendFile(notes.html)
            res.sendFile(path.join(__dirname, '../html/notes.html'));
            break;
        case '/api/notes':
            // GET: Return all saved notes as JSON from db.json
            let dbJSON = fs.readFileSync(path.resolve(dbDirectory, "db.json"), "utf8");
            res.json(JSON.parse(dbJSON));
            break;
        default:
            // GET: rest.sendFile(index.html)
            res.sendFile(path.join(__dirname, '../index.html'));
            break;
    }
});

// POST: Save a new note to db.json
app.post('/api/notes', (req, res) => {
    // create new note with unique id
    let newNote = {
        id: uniqid(),
        note: req.body
    }

    // read db file
    let dbJSON = fs.readFileSync(path.resolve(dbDirectory, "db.json"), "utf8");
    let jsonData = JSON.parse(dbJSON);
    // append new data
    jsonData.push(newNote);
    // write back db file
    fs.writeFile(path.resolve(dbDirectory, "db.json"), JSON.stringify(jsonData), (err) => {
        if (err !== null)
            console.log(err);
    });
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