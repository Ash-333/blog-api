const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:false
    },
    userName:{
        type:String,
        require:true
    },
    categories:{
        type:Array,
        require:true
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Post",PostSchema)