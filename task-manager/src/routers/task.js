const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post("/tasks", async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const {id} = req.params

    if (!(id.length === 12 || id.length === 24)) {
        return res.status(400).send("The ID parameter must be a single String of 12 bytes or a string of 24 hex characters.")
    }

    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        res.status(400).send({ error: "Invalid updates"})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).send()
        }
        res.status(200).send(deleted)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router