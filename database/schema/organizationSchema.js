
import mongoose from "mongoose";


const organizationSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type: String, 
        required: false,
        default: " ",
    }, 

    users: {
        type: Array,
        default: [],
    }

}, {
    timestamps: true
})

organizationSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const Organization = mongoose.model("organization", organizationSchema)
export default Organization