const mongoose= require ('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Demo2",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log("conection successfully..."))
.catch((err)=>console.log(err));
const userSchema= new mongoose.Schema({
   
    product:{
        type: String,
        // required: true
    },
    desc:{
        type: String,
        // required: true
    },
    price:{
        type: String,
        // required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    }

})


const userModel1= mongoose.model('addproduct', userSchema)
module.exports=userModel1