import  express from 'express'
import multer from "multer"
const routerUser= express.Router()
routerUser.use(express.json());
routerUser.use(express.urlencoded({extended: true}))
import User from '../models/usersModel.js'
const upload = multer({ dest: 'client/public/data/profilPicture' })
import tmp from 'tmp'


routerUser.get('/', function(req, res){
  User.find((err,data)=>{
    res.send(data)
  })
})

routerUser.post("/", upload.single('file'), async (req, res) => {
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
    let myUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.firstname,
      rna:req.body.rna,
      imgProfilUrl: req.file !== null ? "/data/profilPicture/" + req.file.filename : "",
      imgProfilName:req.file.originalname,
      pseudo:req.body.pseudo,
      email:req.body.email,
      password:req.body.password,
      isAssociation:req.body.isAssociation   
    });
    await myUser.save();
    console.log(req.file)
    console.log(req.body)
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

routerUser.get('/:pseudo', function(req, res){
    
    User.findOne({pseudo: req.params.pseudo}, (err,data)=>
    { 
      res.send(data)  
       }
    )})
  routerUser.put('/:pseudo',(req,res) => {
    User.findOneAndUpdate({pseudo:req.params.pseudo},req.body,function(err,data){
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
            }
      }
    })
  })

  routerUser.put('/pseudo/:pseudo',(req,res) => {
    User.updateOne({pseudo:req.params.pseudo},{$pull:{followers:req.body.followers}},function(err,data){
      console.log(req.body)
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
            }
      }
    })
  })

routerUser.delete('/:pseudo',(req,res) => {
 User.findOneAndDelete({pseudo:req.params.pseudo},(err,data) => {
    if(err)
    {
      res.sendStatus(404)
    }
    else
    {
      if (!data)
      {
        res.sendStatus(404)
      }
      else
      {
       res.send(data)
      }
    }
  })
})



export default routerUser