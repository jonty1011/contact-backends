const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const ConnectDb = require('./config/dbConnection.js');
const Contactroutes = require('./routes/Contactroutes.js');
const Usersroutes = require('./routes/UsersRoutes.js');
const errorHandler = require('./middleware/errorHandler.js');
const port =process.env.PORT || 5001

// In express we need a body parser to parse incoming body request so we use this middleware
app.use(express.json());


app.use("/api/contacts", Contactroutes);
app.use("/api/users", Usersroutes);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    ConnectDb();
})