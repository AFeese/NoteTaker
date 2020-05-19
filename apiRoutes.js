const dbJSON = require('./db/db.json');

const fs = require("fs");

//API Routing: 
module.exports = function (app) {
    //* GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
 
    app.get("/api/notes", function (req, res) {
        return res.json(noteList);
    });

    //  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post('/api/notes', (req, res) => {
        // get Id of last note if it exists
        const lastId = noteList.length ? Math.max(...(noteList.map(note => note.id))) : 0;
        const id = lastId + 1;

        // pushes the id of the note along with the rest of the text/input of the array in the request
        noteList.push({ id, ...req.body });
        res.json(noteList.slice(-1));
    });

    // * DELETE `/api/notes/:id` -
    app.delete('/api/notes/:id', function (req, res) {
        //finds note by id, then converts the string into a JSON object with the id parameters of the request made
        let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

        //Delete object matching the index of the note ID
        noteList.splice(noteList.indexOf(findNote), 1);
        res.end("Note was deleted");
    });
};