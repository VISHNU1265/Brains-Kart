import express, {request, response} from 'express';
const orderRouter = express.Router();
import tokenVerifier from "../middlewares/TokenVerifier.js";
import {body,validationResult} from "express-validator";
import verifyToken from "../middlewares/TokenVerifier.js";
import UserTable from "../models/User.js";
import user from "../models/User.js";
import OrderTable from "../models/Order.js";

/*
    @info : Place an order
    @url:http://127.0.0.1:5000/api/orders/place
    @method: post
    @fields: items , tax , total
    @access: private
 */
orderRouter.post("/place",verifyToken,[
    body('items').not().isEmpty().withMessage('Items should not be empty'),
    body('tax').not().isEmpty().withMessage('Tax should not be empty'),
    body('total').not().isEmpty().withMessage('Total should not be empty')
],async (request,response )=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors:errors.array()});
    }
    try{
        let {items,tax,total} = request.body;
        let userId = request.header['user'].id;
        let user = await UserTable.findById(userId);
        let newOrder = new OrderTable({
            name:user.name,
            email:user.email,
            mobile:user.address.mobile,
            tax:tax,
            total:total,
            items:items
        });
        newOrder = await newOrder.save();
        response.status(200).json({msg:"Order placed Successfully"});
        
    }
    catch (error){
        console.error(error);
        response.status(200).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        });

    }


});


/*
    @info : Get all Orders
    @url:http://127.0.0.1:5000/api/orders
    @method: get
    @fields: no-fields
    @access: private
 */

orderRouter.get("/",tokenVerifier,async (request,response)=>{
    try{
        let userId = request.header['user'].id;
        let user = await UserTable.findById(userId);
        let orders = await OrderTable.find({email:user.email});
        response.status(200).json({
            orders:orders
        })
    }
    catch (error){
        response.status(500).json({
            errors:[
                {
                    msg:error.message
                }
            ]
        })
    }
});



export default orderRouter;