const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.PORT || 2000
const cors = require('cors')

app.use(cors())

app.use(express.json({limit:'300mb'}))
app.use(express.urlencoded({limit:'300mb',extended:true}))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/postinger', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})
    .then(() => {
        console.log("Mongodb connected");
    })
    .catch(err => console.error(err))

    
app.use('/auth', require('./routes/auth'))
app.use('/post', require('./routes/post'))
app.use('/likes', require('./routes/likes'))
app.use('/profile', require('./routes/profile'))
app.use('/follow', require('./routes/follow'))
app.use('/user', require('./routes/user'))
app.use('/settings', require('./routes/settings'))

app.listen(port, () => {
    console.log("Server started and mongodb connected");
})
