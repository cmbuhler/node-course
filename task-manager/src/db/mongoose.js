const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch((error) => {
    console.log("ERROR:", "Could not connect to mongodb on localhost port 27017")
    process.exit()
}) 

