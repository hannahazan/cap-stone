import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerImg= express.Router()
routerImg.use(express.json());
routerImg.use(express.urlencoded({extended: true}))
import Image from '../models/imageModel.js'

const upload = multer({ dest: 'client/public/data/uploads' })
import tmp from 'tmp'

//********************************************LES POSTS*********************************************** */

// **getAllPost**/////////////////////////////////////////////////////
routerImg.get('/', function (req, res) {
  Image.find((err, data) => {
    res.send(data)
  })
})

// **getOnePost**/////////////////////////////////////////////////////
routerImg.get('/:_id', function (req, res) {
  Image.findOne({ _id: req.params._id }, (err, data) => {
    res.send(data)
  }
  )
});


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
  console.log(req.file, req.body)
  try {
    let myImage = new Image({
      posterId: req.body.posterId,
      message: req.body.message,
      picture: req.file !== null ? "client/public/data/uploads/" + req.filename : "",
      likers: [],
      comments: [],
    });
    await myImage.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




  export default routerImg