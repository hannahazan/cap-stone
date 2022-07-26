import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerImg= express.Router()
routerImg.use(express.json());
routerImg.use(express.urlencoded({extended: true}))
import Image from '../models/imageModel.js'
import mongoose from 'mongoose'


const upload = multer({ dest: 'client/public/data/uploads' })
import tmp from 'tmp'

//********************************************LES POSTS*********************************************** */

// **getAllPost**/////////////////////////////////////////////////////
routerImg.get('/', function (req, res) {
  Image.find((err, data) => {
    res.send(data)
  })
})

routerImg.get('/:pictureName', function (req, res) {
  Image.findOne({ pictureName: req.params.pictureName }, (err, data) => {
    res.send(data)
  }
  )
});
//find all the post of the userPseudo speciefied
routerImg.get('/pseudo/:userPseudo',function(req,res){
  Image.find({userPseudo:req.params.userPseudo}, 
  (err,data)=>{ console.log(data);
  res.send(data) });})


/*routerImg.get('/name/:userPseudo', function (req, res) {
  Image.findOne({ userPseudo: req.params.userPseudo }, (err, data) => {
    res.send(data)
  }
  )
});*/



// **CreatePost**/////////////////////////////////////////////////////
routerImg.post("/", upload.single('file'), async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp/dest')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + ' -' + Math.rond(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
  })
  //console.log("body"+  req.body)
  
  try {
    let myImage = new Image({
      title: req.body.title,
      message: req.body.message,
      pictureUrl: req.file !== null ? "/data/uploads/" + req.file.filename : "",
      pictureName:req.file.originalname,
      likers: [],
      datePost:req.body.datePost,
      userPseudo:req.body.userPseudo,
      userEmail:req.body.userEmail,
      userPicture:req.body.userPicture,
      isAssociation:req.body.isAssociation
    });
    await myImage.save();
    console.log(req.file)
    console.log(req.body)
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

routerImg.put('/:pictureName',(req,res) => {
  Image.findOneAndUpdate({pictureName:req.params.pictureName},req.body,function(err,data){
    if(err){
      res.sendStatus(404)
    }
    else
    {
      if (!data){
          res.sendStatus(404)
         }
     else{
          res.send(data)
          console.log(req.body)
         }
    }
  })
})


  export default routerImg