const bodyParser = require("body-parser");
let express = require("express");
const { Model, default: mongoose } = require("mongoose");
let app = express();
var router = express.Router();
const multer= require('multer')
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);

app.set('view engine', 'ejs');
app.use(express.static('./imgs'));



let userModel = require('./Model/signup.js');
let userModel1 = require('./Model/addproduct.js');
// const gallery= require('./Model/gallerySchema');


app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "somerandomstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 200000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// Add your routes here...


//  middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  }
  else {
    next();
  }
}

// File storing throuh multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './imgs');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });




router.get('/', function (req, res) {
  res.render('index');
});
app.get('/about', function (req, res) {
  res.render('about');
});
app.get('/products', function (req, res) {
  res.render('products');
}
);
app.get('/fertilizer', function (req, res) {
  res.render('fertilizer');
});
// app.get('/gallery', function (req, res) {
//   res.render('gallery');
// });






// signup starts
router.post('/signup', (req, res) => {
  const signup1 = new userModel({
    fname: req.body.fname,
    lname: req.body.lname,
    mob: req.body.mob,
    email: req.body.email,
    pass: req.body.pass,
    cpass: req.body.cpass
  });

  signup1.save()
    .then(() => {
      console.log("saved data!");
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});
// Signup ends

// add product api starts


router.post('/addproduct',upload.single('photo'),(req, res) => {
 
  

    const { product, desc, price } = req.body;
    
    if (!product || !desc || !price) {
      return res.status(400).send('Product, description, and price are required');
    }

   

    // Create new document instance
    const newProduct = new userModel1({
      product,
      desc,
      price,
      photo:{
        data: req.file.filename,
        contentType: 'image/jpg'
      }
    });

    // Save new document to database
    newProduct.save()
      .then(() => {
        console.log('Saved product:', newProduct);
        res.redirect('/dashboard');
      })
      .catch((error) => {
        console.log('Error saving product:', error.message);
        res.status(500).send('Error saving product');
      });
  });


//  Add product ends


// Gallery  /////////////

  //   const name= req.body.name;
  //   const photo=req.file.filename;

  //   const newUserData={
  //     name,
  //     photo
  //   }
  //   const newUser= new gallery(newUserData);
  //     newUser.save()
  //     .then(()=>res.json('user Added'))
  //     .catch(err=>res.status(400).json('Error:'+err));
    
  // }
  // )









// Dashboard Pages
app.get('/dashboard', function (req, res) {
  if(req.session.user && req.cookies.user_sid)
     {
      res.render('./dashboard/dashboard');
    }
    else{
      res.redirect('/dashboard');
    }
  // res.render('./dashboard/dashboard');
  })

// Add product API  starts
router.get('/dashboard/add_product', function (req, res) {
  res.render('./dashboard/add_product');

})
// Add product API ends




// View_product API starts
router.get('/dashboard/view_product', function (req, res) {

  userModel1.find().then((data) => {
    res.render('./dashboard/view_product', { data: data });
    console.log(data);
  })
    .catch((error) => {
      console.log(error);
    })

})


//  View Product API ends


// View Gallery//////////////
router.get('/gallery', function (req, res) {

  userModel1.find().then((data) => {
    res.render('gallery', { data: data });
    // console.log(data);
  })
    .catch((error) => {
      console.log(error);
    })

})

// View Gallery//////////////





// login starts
router.post('/login', async (req, res) => {
  var email = req.body.email,
    pass = req.body.pass;
  try {
    var user = await userModel.findOne({ email: email }).exec();
    if (!user) {
      res.redirect('/')
    }
    user.comparePassword(pass,(err, match)=>{
        if(!match){
            res.redirect('/');
        }
    });
    req.session.user=user;
    res.redirect('/dashboard');
    res.status(200).json({message: 'Redirecting to Dashboard'})

  }
  catch (error) {
    console.log(error);
  }
});
// Login ends

// ///////////////////////////////////
// Log out API

app.get("/logout/:id", (req, res)=>{
  if(req.session.user && req.cookies.user_sid){
    res.clearCookie("user_sid");
    res.redirect('/');
  }
  else{
    res.redirect('/dashboard');
  }
});
// ///////////////////////////////////////


// View register starts

router.get('/dashboard/view_register', function (req, res) {

  userModel.find().then((data) => {

    res.render('./dashboard/view_register', { data: data });
    console.log(data);
  })
    .catch((error) => {
      console.log(error);
    })
})


// //////////Delete Button///////////////////////////
router.get('/delete/:id', (req, res) => {
  userModel.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/dashboard/');
    })
    .catch((error) => {
      res.redirect('/dashboard/');
    });
});

// //////////Delete Button///////////////////////////
// Add product delete//////////////////
router.get('/delete1/:id', (req, res) => {
  userModel1.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/dashboard/');
    })
    .catch((error) => {
      res.redirect('/dashboard/');
    });
});

// Add product delete//////////////////



// View Register ends










// ////////////Edit Button Starts/////////////////
router.get('/edit/:id', (req, res) => {

  userModel.findById(req.params.id).then((data) => {
    res.render('./dashboard/edit_viewregister', { data: data });
  })
    .catch((error) => {
      res.redirect('/');
      console.log(error);
    });
});



// ////////////Edit Button Ends/////////////////




// Edit button Post /////////////
router.post('/edit_form/:id', (req, res) => {

  var updatedit = {
    fname: req.body.fname,
    lname: req.body.lname,
    mob: req.body.mob,
    email: req.body.email,
    pass: req.body.pass
  }
  userModel.findByIdAndUpdate(req.params.id, updatedit).then(() => {
    res.redirect('../dashboard/view_register');
  })
    .catch((error) => {
      res.redirect('/dashboard');
      console.log(error);
    });
});








app.use('/', router);
app.listen(5200);