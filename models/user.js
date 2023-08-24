import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Please add an email'],
    },
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Please add a username'],
        //regex to make username only contain alpanumeric characters, underscores and hyphens
        
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],  
  },
  image: {
    type: String,
    requuired: [true, 'Please add an image'],
},

})

//The models object is provided by Mongoose and contains all models that have been registered with it.
//if a model with the name "User" already exists, use that model, otherwise create a new model
//This prevents redifining models and throwing errors

//If the model named "User" does not exists, in the models object, the "model" function from gthe Mongoose is called to create a new model
//The newly created model is assigned to the User variable


const User = models.User || model('User', UserSchema);

export default User;