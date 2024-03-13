import mongoose from "mongoose";    

const Commodityschema=new mongoose.Schema({
    category:{
        type:String,
        required:true,    
    },
    subcategory:{
        type:String,
        lowercase:true
    },
    slug:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
})

export default mongoose.model('commodities',Commodityschema);