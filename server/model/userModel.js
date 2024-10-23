const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
        name:{type:String,require:true},
        status:{type:String,require:true},
        role:{type:String,require:true},
        email:{type:String,require:true},
        DOB:{type:String,require:true},
        nationality:{type:String,require:true},
        contact:{type:String,require:true},
        eaddress:{type:String,require:true}
    }
)
const user=mongoose.model("User",userSchema)

module.exports=user