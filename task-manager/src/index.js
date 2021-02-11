const express = require('express')

// Mongoose includes
// Models: 
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

// Routers:
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Setup use for express app
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// Start app
app.listen(port, () => {
    console.log('server is running on port ' + port)
})