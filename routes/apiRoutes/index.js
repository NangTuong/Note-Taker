const notesList = [];
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notes = require('../../db/db.json');


router.get('/notes', (req, res) => {
    res.json(notes)
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = writeNewNote(req.body, notes);
    res.json(newNote);
});

function writeNewNote(body, notesList) {
    const note = body;

    notesList.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesList, null, 2)
    );
    return note;
}

module.exports = router;