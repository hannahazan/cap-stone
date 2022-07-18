import  express from 'express'
const routerUser= express.Router()
routerUser.use(express.json());
routerUser.use(express.urlencoded({extended: true}))
import User from '../models/usersModel.js'


routerUser.get('/', function(req, res){
  User.find((err,data)=>{
    res.send(data)
  })
})

routerUser.get('/:_id', function(req, res){
    
    User.findOne({_id: req.params._id}, (err,data)=>
    { 
      res.send(data)  
       }
    )})

    
routerUser.post('/',(req,res) => {
  console.log(req.body)
  let myUser= new User(req.body)
  myUser.save()
   .then(() =>console.log("enregistré"))
   .catch(err => console.log("error"))
  res.send(myUser)  
})
routerUser.put('/:_id',(req,res) => {
User.findOneAndUpdate({_id:req.params._id},req.body,function(err,data){
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
          res.json(data)
         }
    }
  })
})

routerUser.delete('/:_id',(req,res) => {
 User.findOneAndDelete({_id:req.params._id},(err,data) => {
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

export default routerUser