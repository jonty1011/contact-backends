const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId, // this id is created in mongoDb so that's why this object id
            required: true,
            ref:"UserModel",
        },
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
},{timestamps:true,});

const ContactModel = mongoose.model('Contact',ContactSchema);
module.exports = ContactModel;