import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required: true
    },
    resetOTP:{
        type: String,
        default: null
    },
    resetOTPExpires: {
        type: Date,
        default: null
    }

})
const User = mongoose.model('User', userSchema)
export default User