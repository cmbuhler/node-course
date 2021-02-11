const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const {id} = req.params

    if (!(id.length === 12 || id.length === 24)) {
        return res.status(400).send("The ID parameter must be a single String of 12 bytes or a string of 24 hex characters.")
    }

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        res.status(400).send({ error: "Invalid updates"})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).send()
        }
        res.status(200).send(deleted)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router