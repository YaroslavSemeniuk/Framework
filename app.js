const Application = require('./framework/Application')
const jsonParse = require('./framework/parseJson')
const parseUrl = require('./framework/parseUrl')
const userRouter = require('./src/userRouter')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 8080
const URL = process.env.DB_URL
const app = new Application()

app.use(jsonParse)
app.use(parseUrl('http://localhost:8080'))
// subscribe on [path]:[method] event. Example: 'users/':'GET'
app.addRouter(userRouter)

const start = async () => {
    try{
        await mongoose.connect(URL)
        app.listen(PORT, () => console.log('Server started on port', PORT))
    } catch (e) {
        console.log(e);
    }
}

start()
