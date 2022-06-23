import express, {response,request} from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routing/userRouter.js';
import paymentRouter from './routing/productRouter.js';
import orderRouter from './routing/orderRouter.js';
import productRouter from "./routing/productRouter.js";

const app = express();

//configure cors
app.use(cors());

//configure dotEnv
dotEnv.config({path:"./.env"});

const port = process.env.PORT | 5000;

//configure express to receive form data
app.use(express.json());

//configure mongodb connections
mongoose.connect(process.env.MONGO_DB_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to Database Successfully");
    }
})



app.get('/',(request,response)=>{
    response.send(`<h2>Online Shopping Application</h2>`);
});

//router configurations

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);
app.use("/api/payment",paymentRouter);


app.listen(port,(request,response)=>{
    console.log(`Express server is started at port :${port}`);
});



