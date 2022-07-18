import mongoose from 'mongoose';

const imgSchema = new mongoose.Schema({
   imgName:String,
   imgUrl:{
      data:Buffer,
      contentType:String
   }
})
    
const Image = mongoose.model('Image',imgSchema);


export default Image;