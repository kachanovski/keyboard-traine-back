const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const routes = require('./routes.ts')

const app = express()

const PORT = config.get('port') || 5001

//получить картинку с сервера
app.use('/uploads', express.static('uploads'))

app.use(express.static('public'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://accounts.google.com/'] }))

app.use("/", routes)


const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        app.listen(PORT, () =>
            console.log(`Example app listening on port ${PORT}!`),
        );
    } catch (e) {
        console.log(e)
    }
}

start()