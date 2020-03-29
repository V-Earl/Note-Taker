const express = require("express");
const path = require("path");
const notes = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3000;
let id = notes.length;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    return res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    notes.splice(notes.findIndex(n => n.id == id), 1);
    return res.json(notes);

})


app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
});