const fs = require('fs')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')


// Add, Remove, Read, List

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// set up list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler(argv) {
        notes.listNotes()
    }
})

// set up read command
yargs.command({
    command: 'read',
    describe: 'Read a specific note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();

