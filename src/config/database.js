const mongoose = require('mongoose');

const { DB_URL } = require('../config/env');
 
mongoose.connect(
    DB_URL,
        {
            autoIndex: true,
        }
    );
   
    /*.then(() => {
       console.log('Database connected succesfully');
    }).catch((err) => {
        console.log("Failed to connect database", err);
    });*/

mongoose.connection.on("connected", () => {
    console.log("Database connected succesfully");
});

mongoose.connection.on("error", (err) => {
    console.log("Failed to connect database", err);
});