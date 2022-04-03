const dbcon = require('mongoose');

function connect() {
    dbcon.connect('mongodb+srv://test1:testing123@cluster0.ttw6m.mongodb.net/User', {
    useUnifiedTopology : true,
    useNewUrlParser: true,
    }).then(console.log('Connected to Mongo db!'))
}

module.exports.connect = connect;