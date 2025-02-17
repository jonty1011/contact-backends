const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username:{
    type:String,
    required:[true, "Enter Username"],
},
email:{
    type:String,
    required:[true, "Enter Email"],
    unique:[true, "Email is taken so you another"],
},

password:{
    type:String,
    required:[true, "Enter Password"],
    minlength:[8, "Password must be at least 8 characters long"],
}
},{
    timestamps:true,
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;