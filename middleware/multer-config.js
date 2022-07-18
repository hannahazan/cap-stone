import multer from "multer"
const MIME_TYPES={
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image.png': 'png'
}

const storage= multer.diskStorage({
   destination:(req,file,callback)=>{
     callback(null,'image')
   },
   filename: (req,file,callback)=>{
    const extension =MIME_TYPES[file.mimetype];
    callback(null, file.originalname + Date.now()+ '.' + extension);
   } 
})

export default storage