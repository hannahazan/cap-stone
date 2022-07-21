import mongoose from 'mongoose';

const imgSchema = new mongoose.Schema(
   {
       posterId: {     // le post de l'assosiation
           type: String,
           
       },
       title: {     
           type: String,
       },
       message: {     // le post de l'assosiation
           type: String,
       },
       picture: {     // le post de l'assosiation
           type: String,
       },
       video: {     // le post de l'assosiation
           type: String,
       },
       NumberOfLikes: {
           type: [Number], //pour incrementer par la suite a chaque like
          
       },
       likers: {        //toutes les personnes qui ont aimé le post,
           type: [String],  // tableau des id des utilisateurs qui ont liker le post, éviter plusieurs likes de la même personne 
           
       },
       comments: {
           type: [
               {
                   commenterId: String, // id du Benevol
                   commenterPseudo: String, //pseudo du Benevol
                   text: String,     //commentaire 
                   timestamp: Number, //permet d'afficher les commentaires selon  "la valeur la plus élevée en derniers"  
               }
           ],
           
       },
       timestamp: Number, //permet d'afficher le dernier post en tête 
   });

    
const Image = mongoose.model('Image',imgSchema);


export default Image;