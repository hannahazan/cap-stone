import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
firstname:String,
lastname:String,
rna:Number,
imgProfilUrl:String,
imgProfilName:String,
pseudo:String,
email:String,
password:String,
isAssociation:Boolean,
})

const User = mongoose.model('users', userSchema);

export default User;