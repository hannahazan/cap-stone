import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import multer from 'multer';
import routerUsers from './routes/users.js';
import routerPost from './routes/posts.js'
import routerImg from './routes/img.js';
const app = express()
const port = 4000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('upload'))


app.use('/users',routerUsers)
app.use('/posts',routerPost)
app.use('/img/:_id',routerImg)


// connection à la bdd mongodb
main().catch(err => console.error(err))
async function main() {
    await mongoose.connect('mongodb+srv://hannah:TBlIyaXZd1aS1wgh@cluster0.aailhd7.mongodb.net/cap_stone?retryWrites=true&w=majority');
    console.log("connection réussi");

}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})