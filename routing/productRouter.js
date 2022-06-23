import express, {request, response} from 'express';
import tokenVerifier from "../middlewares/TokenVerifier.js";
const productRouter = express.Router();
import {body,validationResult} from "express-validator";
import ProductTable from "../models/Product.js";
/*
    @info : Upload a product
    @url:http://127.0.0.1:5000/api/products/upload
    @method: post
    @fields:  name,brand,price,qty,image,category,description,usage
    @access: private
 */
productRouter.post("/upload",[
    body('name').not().isEmpty().withMessage('Name is Required'),
    body('brand').not().isEmpty().withMessage('Brand is Required'),
    body('price').not().isEmpty().withMessage('Price is Required'),
    body('qty').not().isEmpty().withMessage('Quantity is Required'),
    body('image').not().isEmpty().withMessage('Image is Required'),
    body('category').not().isEmpty().withMessage('Category is Required'),
    body('description').not().isEmpty().withMessage('description is Required'),
    body('usage').not().isEmpty().withMessage('Usage is Required')],tokenVerifier,async (request,response)=>{

    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors:errors.array()
        })
    }
    try{
        let {name,brand,price,qty,image,category,description,usage}=request.body;
        let newProduct = new ProductTable({
            name:name,
            brand:brand,
            price:price,
            qty:qty,
            image:image,
            category:category,
            description:description,
            usage:usage
        });

        newProduct = await newProduct.save();

        response.status(200).json({
            msg:"Product Uploaded Successfully"
        })

    }
    catch (error){
        console.error(error);
        response.status(500).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        })
    }

});


/*
    @info : Get Men's Collection
    @url:http://127.0.0.1:5000/api/products/men
    @method: get
    @fields: no-fields
    @access: public
 */
productRouter.get("/men",async (request,response)=>{
    try{
        let products = await ProductTable.find({category:"MEN"});
        response.status(200).json({
            products:products
        })
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        })
    }
});



/*
    @info : Get Women's Collection
    @url:http://127.0.0.1:5000/api/products/women
    @method: get
    @fields: no-fields
    @access: public
 */
productRouter.get("/women",async (request,response)=>{
    try{
        let products = await ProductTable.find({category:"WOMEN"});
        response.status(200).json({
            products:products
        })
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        })
    }
});


/*
    @info : Get Kid's Collection
    @url:http://127.0.0.1:5000/api/products/kids
    @method: get
    @fields: no-fields
    @access: public
 */
productRouter.get("/kids",async (request,response)=>{
    try{
        let products = await ProductTable.find({category:"KIDS"});
        response.status(200).json({
            products:products
        })
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        })
    }
});

/*
    @info : Get a Product
    @url:http://127.0.0.1:5000/api/products/:productId
    @method: get
    @fields: no-fields
    @access: public
 */

productRouter.get("/:productId",async (request,response)=>{


    try{
        let productId = request.params.productId;
        let product = await ProductTable.findById(productId);
        response.status(200).json(product)
    }
    catch (error){
        console.error(error);
        response.status(500).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        })
    }
});


export default productRouter;



