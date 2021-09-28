//schema represents the structure of a particular document

const mongoose =require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true  // removing the first space in value input 

    },
    location:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },
    email:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },
    contactNumber:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },

    date:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    }



},{timestamps:true})// date  and time of the data being passed
    
   


const User= mongoose.model('user',userSchema);

module.exports = User;