const mongoose = require("mongoose")


const userData = mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"USERSIGNUP"
    },
    email: {
        type: String,
    },
    desc: {
        type: String,
    },
     date: {
        type: String,
    }
})
const AddNotes = mongoose.model("notes", userData);
module.exports=AddNotes;
