const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter Contact Name"]
    },
    email:{
        type:String,
        required: [true,"Please enter Contact Email Address"]
    },
    phone:{
        type:String,
        required: [true,"Please enter Contact Phone Number"]
    },
},{timestamp:true,});

const ContactModel = mongoose.model('Contact',ContactSchema);
module.exports = ContactModel;