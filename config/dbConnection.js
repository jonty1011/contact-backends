const mongoose = require('mongoose');
const ConnectDb = async()=> {
    try{
        const uri =process.env.CONNECT_STRING
        const db = await mongoose.connect(uri);
        console.log(`Connect to the Database 
            ${db.connection.host}, ${db.connection.name}` );
         
    }catch(err){
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    } 
}

module.exports = ConnectDb;
