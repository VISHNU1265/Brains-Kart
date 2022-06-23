import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    tax:{type:String,required:true},
    total:{type:String,required:true},
    items:[
        {
            name:{type:String,required:true},
            brand:{type:String,required:true},
            price:{type:Number,required:true},
            qty:{type:Number,required:true}
        }
    ]
},{timestamps:true});

const OrderTable = mongoose.model('order',orderSchema);
export default OrderTable;
