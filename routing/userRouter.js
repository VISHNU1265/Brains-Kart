import express, {request, response} from 'express';
import UserTable from "../models/User.js";
import bcrypt from "bcryptjs";
import gravatar from 'gravatar';
import {body,validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import user from "../models/User.js";
import verifyToken from "../middlewares/TokenVerifier.js";
import tokenVerifier from "../middlewares/TokenVerifier.js";


const userRouter = express.Router();

/*

    @info : Register a user
    @url : http://127.0.0.1:5000/api/users/register
    @method : post
    @fields: name , email , password
    @access : public
 */

userRouter.post('/register',[
    body('name').not().isEmpty().withMessage("Name is Required"),
    body('email').not().isEmpty().withMessage("Email is Required"),
    body('password').not().isEmpty().withMessage("Password is Required")
],async (request,response)=>{

    const errors = validationResult(request);
    if(!errors.isEmpty()){
        response.status(400).json({errors:errors.array()});
    }


    try{
        let {name,email,password}=request.body;
        //check if user exist already
        let user = await UserTable.findOne({email:email});
        if(user){
            return response.status(401).json({msg:"User Already Exists"});
        }

        //encrypt the password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password,salt);


        //avatar url for email
        let avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });


        //default address
        let address = {
            flat:"",
            street:"",
            landmark:"",
            city:"",
            state:"",
            country:"",
            pin:"",
            mobile:""

        }

        //register the user
        let newUser = new UserTable({
            name:name,
            email:email,
            password:hashedPassword,
            avatar:avatar,
            address:address
        });

        newUser = await newUser.save();


        //send the response
        response.status(200).json({
            msg:"Registration is successfully"
        })





    }
    catch(error) {
        console.error(error);
        response.status(500).json({
            errors:[{msg:error.message}]
        });

    }
});

/*

    @info : Login a user
    @url : http://127.0.0.1:5000/api/users/login
    @method : post
    @fields: email , password
    @access : public
 */

userRouter.post("/login",[
    body('email').not().isEmpty().withMessage("Email is Required"),
    body('password').not().isEmpty().withMessage("Password is Required")
],async (request,response)=>{
    let errors = validationResult(request);

    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    try{
        let {email,password} = request.body;

        //check the email
        let user = await UserTable.findOne({email:email});
        if(!user){
            return response.status(401).json({
                errors:[
                    {
                        msg:"Email is Not Found"
                    }
                ]
            });
        }
        //check the password
        let isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return response.status(401).json({
                errors:[
                    {
                        msg:"Password is Not Found"
                    }
                ]
            })
        }

        //create a token
        let payload = {
            user:{
                id:user.id,
                name:user.name
            }
        };

        jwt.sign(payload,process.env.JWT_SECRET_KEY,(error,token)=>{
            if(error) throw  error;
            response.status(200).json({
                msg:'Login is Success',
                token:token
            })
        });

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

    @info : Get a user
    @url : http://127.0.0.1:5000/api/users/
    @method : get
    @fields: no-fields
    @access : private
 */

userRouter.get("/",verifyToken,async (request,response)=>{
    try{
        let userId = request.header['user'].id;
        let user = await UserTable.findById(userId).select("-password");
        response.status(200).json({
            user:user,
        });


    }
    catch (error){
        response.status(500).json({
            errors:[{
                msg:error.message
            }]
        })

    }
});

/*

    @info : Update / Create Address
    @url : http://127.0.0.1:5000/api/uses/address
    @method : post
    @fields: flat,street,landmark,city,state,country,pin,mobile
    @access : private
 */
userRouter.post("/address",[
    body('flat').not().isEmpty().withMessage('Flat is Required'),
    body('street').not().isEmpty().withMessage('Street is Required'),
    body('landmark').not().isEmpty().withMessage('Landmark is Required'),
    body('city').not().isEmpty().withMessage('City is Required'),
    body('state').not().isEmpty().withMessage('State is Required'),
    body('country').not().isEmpty().withMessage('Country is Required'),
    body('pin').not().isEmpty().withMessage('Pin is Required'),
    body('mobile').not().isEmpty().withMessage('Mobile is Required')

],tokenVerifier,async (request,response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        response.status(400).json({errors:errors.array()});
    }
    try{
        let {flat,street,landmark,city,state,country,pin,mobile} = request.body;
        let newAddress = {
            flat:flat,
            street:street,
            landmark:landmark,
            city:city,
            state:state,
            country:country,
            pin:pin,
            mobile:mobile
        }

        let userId = request.header['user'].id;
        let user = await UserTable.findById(userId);
        user.address = newAddress;
        await user.save(); //update to database
        response.status(200).json({
            msg:"Address is Updated"
        });

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


export default userRouter;