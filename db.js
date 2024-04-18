const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://manikantamannalliker:himaansh01@cluster0.8cdpsbn.mongodb.net/");


const userSchema= new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
});

const User = mongoose.model("User",userSchema);

module.exports={
    User
}