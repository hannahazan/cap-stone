import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userPseudo:String,
    body:String
    })
    
const Post = mongoose.model('Post',postSchema);


export default Post;