import mongoose from 'mongoose';

const imgSchema = new mongoose.Schema({
   imgUrl:String
})
    
const Image = mongoose.model('Img',imgSchema);


export default Image;