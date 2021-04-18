const mongoose = require('mongoose')

const connString = process.env.MONGODB
const port = process.env.port

module.exports = function (app) {
    mongoose
        .connect(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            app.listen(port, () => console.log(`Listening on port ${port}`))
            console.log('Successfully connected to the Database')
        })
        .catch((e) => {
            console.log('Server Error', e)
            process.exit(1)
        })
}
