import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// first create the scehema for collection/
var userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true

    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false

    }
},{timestamps:true})


//middle ware for encrytptung password


userSchema.pre('save',async function(next){

    if(this.isModified('password')){

        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
    }
    
})
// use the scehem to create model/

userSchema.methods.matchPassword=async function(enteredPasssword){
    console.log("IN MATCH");
    console.log(enteredPasssword);
    return await bcrypt.compare(enteredPasssword,this.password)
    
}

const User=mongoose.model('User',userSchema)

export default User 