import mongoose from 'mongoose';

const imgSchema = new mongoose.Schema(
   {
       title:String,
       message:String,
       pictureUrl:String,
       pictureName:String,
       like:Array,
       comments:Array,
       datePost:String,
       userPseudo:String,
       userEmail:String,
       userPicture:String,
       isAssociation:Boolean,
       sortCompare:Number,
   });

    
const Image = mongoose.model('Image',imgSchema);


export default Image;