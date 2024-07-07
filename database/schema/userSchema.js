import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String, 
        required: true,
    }, 
    phone:{
        type:String,
        required: true, 
    }, 
    organization:{
        type:Array,
        default: []
    }
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const User = mongoose.model("user", userSchema)
export default User