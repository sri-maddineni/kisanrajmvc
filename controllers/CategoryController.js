import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const CategoryController=async(req,res)=>{
    try {
        
        const {name}=req.body;
        if(!name){
            return res.status(401).send({
                message:"Name is required!"
            })

        }

        const existcategory=await CategoryModel.findOne({name})

        if(existcategory){
            return res.status(200).send({
                success:true,
                message:"Category already exists"
            })
        }

        const category=await new CategoryModel({name,slug:slugify(name)}).save()

        res.status(201).send({
            success:true,
            message:"new category created",
            category
        })

    } catch (error) {
     console.log(error)   
     res.status(500).send({
        success:false,
        error,
        message:"Error in category"
     })
    }
    
}

//update category
export const updateCategoryController= async(req,res)=>{
try {
    const {name}=req.body;
    const {id}=req.params

    const category=await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    res.status(200).send({
        success:true,

    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"error while updating category"
    })
}
}


//get categories

export const categoryController=async(req,res)=>{
    try {
        const category=await CategoryModel.find({})
        res.status(200).send({
            success:true,
            message:"all categories",
            category,
            totalcount:category.length
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error all categories"
        })
    }
}

//get signle category

export const singleCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        const category=await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get single category successfull",
            category
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success:false,

        })  
    }
}


//delete category
export const deleteSingleCategory=async(req,res)=>{
    try {
        const {id}=req.params
        await CategoryModel.findByIdAndDelete(id)

        res.status(200).send({
            success:true,
            message:"deleted successfully",
            

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error at whiel deleting category",
            error
        })
    }
}