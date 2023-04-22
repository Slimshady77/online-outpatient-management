const mongoose= require ('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Demo",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log("conection successfully..."))
.catch((err)=>console.log(err));



// mongodb+srv://robincyril24:Robin1993@cluster0.rebkxr7.mongodb.net/?retryWrites=true&w=majority