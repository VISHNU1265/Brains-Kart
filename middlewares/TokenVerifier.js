import jwt from "jsonwebtoken";
import express from "express";

const verifyToken = (request,response,next)=>{
    let token = request.header('x-auth-token');
    if(!token){
        return response.status(401).json({
            msg:"No Token Provided,Access Denied"
        })
    }
    try{
        let decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        request.header['user']=decode.user;
        next();
    }
    catch (error){
        response.status(401).json({
            msg:"Invalid Token Provided"
        })

    }
};


export default verifyToken;