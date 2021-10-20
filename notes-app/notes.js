const chalk = require("chalk");
const fs = require("fs");

//-----------------------------------------------------------------------

const getNotes = () => "Your notes...";

//-----------------------------------------------------------------------

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

//-----------------------------------------------------------------------

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

//-----------------------------------------------------------------------

const addNote = function (title, body) {
  const notes = loadNotes();
  console.log(notes);
  const duplicateNote = notes.find((note) => note.title === title);
  console.log(Boolean(duplicateNote)); 


  console.log("log de duplicateNote: ", duplicateNote);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("New note added!"));
  } else {
    console.log("Note title taken!");
  }
};

//-----------------------------------------------------------------------

const removeNote = function (title) {
  const notes = loadNotes();

  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });
  if (notes.length > notesToKeep.length) {
    console.log(chalk.red.bold("Found a match, deleting ..."));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.bold("No matches found"));
  }
};

//-----------------------------------------------------------------------

const listNotes = function () {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("You don't have any notes");
  } else {
    console.log(chalk.green("Your notes"));
    console.log(chalk.blue("================="));

    notes.filter(function (note) {
      console.log("Title: ", note.title);
      console.log(note.body);
      console.log(chalk.grey("================"));
    });
  }
};

//-----------------------------------------------------------------------

const readNote = function (title_) {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title_);
  if (!noteToRead) {
    console.log(chalk.red("Note not found!"));
  } else {
    console.log(chalk.green("Your note"));
    console.log("Title: ", noteToRead.title);
    console.log(noteToRead.body);
  }
};

//-----------------------------------------------------------------------

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
