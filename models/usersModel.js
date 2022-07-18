import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
firstname:String,
lastname:String,
rna:Number,
pseudo:String,
email:String,
password:String,
img:String,
isAssociation:Boolean,
})

const User = mongoose.model('users', userSchema);

export default User;