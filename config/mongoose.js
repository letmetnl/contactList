//require the library
const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost/contacts_list_db');

//check the connection, acquire the connection 
const db=mongoose.connection;

// if error
db.on('error', console.error.bind(console,'Error in connecting to db'));

//else up n running
db.once('open', function(){
    console.log('successfully connected to the database');
})
