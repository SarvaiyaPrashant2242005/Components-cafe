const categoryModel = require("../models/category.model");

const categoryControl = {
    getCategory : async (req,res) => {
        try{
            const category = await categoryModel.find({})
            if(!category){
                return res.status(400).json({messege : "No category Found" , status : false})
            }
            res.status(200).json(category);
        }
        catch(err){
            res.status(500).json({status : false , messege : err.messege})
        }
    },
    createCategory : async (req,res) => {
        try{
            const {name} = req.body;
            const newCategory = new categoryModel({name});
            await newCategory.save()
            res.status(200).json({status : true , messege : "Category Added Successfully"});
        }
        catch(err){
            res.status(500).json({status : false , messege :  err.message});
        }
    },

    deleteCategory : async (req,res) => {
        try{
                const id = req.params.id;
            await categoryModel.findOneAndDelete({_id :id});
            res.status(200).json({status : true, messege : "Category Deleted"});
        }
        catch(err){
            res.status(500).json({status : false, messege : err.message});
        }
    },
    updateCategory : async (req,res) => {
        try{
            const id = req.params.id;
            const {name} = req.body;

            await categoryModel.findOneAndUpdate({_id : id} , {name});

            res.status(200).json({status : true, messege : "Category Updated SuccessFully"});
        }
        catch(err){
            res.send(500).json({status : false, messege : err.messege});
        }
    }
} 

module.exports = categoryControl;