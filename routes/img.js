import  express from 'express'
import multer from "multer"
import  uuidv4 from 'uuidv4'
const routerImg= express.Router()
routerImg.use(express.json());
routerImg.use(express.urlencoded({extended: true}))
import Image from '../models/imageModel.js'
const upload=multer()


routerImg.get("/", (req, res, next) => {
  Image.find().then(data => {
      res.status(200).json({
          message: "User list retrieved successfully!",
          users: data
      });
  });
});



  export default routerImg