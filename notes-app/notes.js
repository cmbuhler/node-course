const fs = require('fs')
const chalk = require('chalk')

const getNotes = function() {
    return "Your notes..."
}

const addNote = (title, body) => {
    let notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.blue("Added new note!"))
    } else {
        console.log(chalk.red.bold('Error: Note title taken!'))
    }
}

const removeNote = (title) => {
    let notes = loadNotes()
    const keepNotes = notes.filter((note) => note.title !== title)
    if (keepNotes.length == notes.length) {
        console.log(chalk.red.inverse("No note found with that title!"))
    } else {
        console.log(chalk.green.inverse('Successfully removed note: ' + title))
        saveNotes(keepNotes)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.magenta.underline('Your notes'))
    for (let note of notes) {
        console.log('- ' + chalk.blue(note.title))
    }
}

const readNote = title => {
    const notes = loadNotes()
    const note = notes.find(note => note.title == title)
    if (note) {
        console.log(chalk.blue.underline(note.title))
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Error: no note found with that title.'))
    }

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}