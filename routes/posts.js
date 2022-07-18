import  express from 'express'
const routerPost= express.Router()
routerPost.use(express.json());
routerPost.use(express.urlencoded({extended: true}))
import Post from '../models/postModels.js'


routerPost.get('/', function(req, res){
  Post.find((err,data)=>{
    res.send(data)
  })
})

routerPost.get('/:_id', function(req, res){
    
    Post.findOne({_id: req.params._id}, (err,data)=>
    { 
      res.send(data)  
       }
    )})

 
routerPost.post('/',(req,res) => {
  console.log(req.body)
  let myPost= new Post(req.body)
  myPost.save()
   .then(() =>console.log("enregistré"))
   .catch(err => console.log("error"))
  res.send(myPost)  
}) 
routerPost.put('/:_id',(req,res) => {
  Post.findOneAndUpdate({_id:req.params._id},re.body,function(err,data){
    if(err)
    {
      res.sendStatus(404)
    }
    else
    {
      if (!data)
         {
          res.sendStatus(404)
         }
         else
         {
          res.send(data)
         }
    }
  })
})

routerPost.delete('/:_id',(req,res) => {
 Post.findOneAndDelete({_id:req.params._id},(err,data) => {
    if(err)
    {
      res.sendStatus(404)
    }
    else
    {
      if (!data)
      {
        res.sendStatus(404)
      }
      else
      {
       res.send(data)
      }
    }
  })
})

export default routerPost