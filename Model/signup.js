const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

var url="mongodb://127.0.0.1:27017/Demo2";
mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        unique: true,
        required: true
    },
    lname:{
        type: String,
        unique: true,
    },
    mob:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    pass:{
        type: String,
        required: true
    },
    cpass:{
        type: String,
        required: true
    }


})
// //////////Create Hash Password///////////////
userSchema.pre("save", function(next){
    if(!this.isModified("pass")){
        return next();
    }
    this.pass= bcrypt.hashSync(this.pass, 10)
    next();
});
// Compare Password
userSchema.methods.comparePassword= function(plaintext, callback){
    return callback(null, bcrypt.compareSync(plaintext, this.pass));
};


const userModel =mongoose.model('user', userSchema)
module.exports=userModel

