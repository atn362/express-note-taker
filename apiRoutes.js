var fs = require("fs");
var notesData = getNotes();

//function to parse data to json in the db file and a create unique ID with loop 
function getNotes() {
    let data = fs.readFileSync('./db/db.json', 'utf8');

    let notes = JSON.parse(data);

    for (let i = 0; i < notes.length; i++) {
        notes[i].id = '' + i;
    }

    return notes;
}

module.exports = function (app) {

//calls notes api to post the data then delete it 
    app.get("/api/notes", function (req, res) {
        notesData = getNotes();
        res.json(notesData);
    });

    app.post("/api/notes", function (req, res) {
        notesData.push(req.body);
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData), 'utf8');
        res.json(true);
    });
    //calls the note api and deletes it by referencing its id
    app.delete("/api/notes/:id", function (req, res) {
        const requestID = req.params.id;
        console.log(requestID);

        let note = notesData.filter(note => {
            return note.id === requestID;
        })[0];

        console.log(note);
        const index = notesData.indexOf(note);

        notesData.splice(index, 1);

        fs.writeFileSync('./db/db.json', JSON.stringify(notesData), 'utf8');
        res.json("Note deleted");
    });
};