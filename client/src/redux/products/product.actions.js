import {AuthUtil} from "../../util/AuthUtil";
import {TokenUtil} from "../../util/TokenUtil";
import * as AlertActions from "../alert/alert.actions";
import axios from "axios";

export const UPLOAD_PRODUCT_REQUEST = `UPLOAD_PRODUCT_REQUEST`;
export const UPLOAD_PRODUCT_SUCCESS = `UPLOAD_PRODUCT_SUCCESS`;
export const UPLOAD_PRODUCT_FAILURE = `UPLOAD_PRODUCT_FAILURE`;


export const GET_MENS_PRODUCTS_REQUEST = `GET_MENS_PRODUCTS_REQUEST`;
export const GET_MENS_PRODUCTS_SUCCESS = `GET_MENS_PRODUCTS_SUCCESS`;
export const GET_MENS_PRODUCTS_FAILURE = `GET_MENS_PRODUCTS_FAILURE`;

export const GET_WOMEN_PRODUCTS_REQUEST = `GET_WOMEN_PRODUCTS_REQUEST`;
export const GET_WOMEN_PRODUCTS_SUCCESS = `GET_WOMEN_PRODUCTS_SUCCESS`;
export const GET_WOMEN_PRODUCTS_FAILURE = `GET_WOMEN_PRODUCTS_FAILURE`;



export const GET_KIDS_PRODUCTS_REQUEST = `GET_KIDS_PRODUCTS_REQUEST`;
export const GET_KIDS_PRODUCTS_SUCCESS = `GET_KIDS_PRODUCTS_SUCCESS`;
export const GET_KIDS_PRODUCTS_FAILURE = `GET_KIDS_PRODUCTS_FAILURE`;

export const GET_PRODUCT_DETAILS_REQUEST = `GET_PRODUCT_DETAILS_REQUEST`;
export const GET_PRODUCT_DETAILS_SUCCESS = `GET_PRODUCT_DETAILS_SUCCESS`;
export const GET_PRODUCT_DETAILS_FAILURE = `GET_PRODUCT_DETAILS_FAILURE`;


export const uploadProduct = (product,navigate)=>{
    return async (dispatch) =>{
        try{
           if(AuthUtil.isLoggedIn()){
               let token = AuthUtil.getToken();
               TokenUtil.setTokenHeader(token);
               dispatch({type:UPLOAD_PRODUCT_REQUEST});
               let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/upload`;
               let response = await axios.post(dataURL,product);
               dispatch({type:UPLOAD_PRODUCT_SUCCESS,payload:product});
               dispatch(AlertActions.setAlert(response.data.msg,"success"));
               navigate("/");

           }
        }
        catch(error){
            console.error(error);
            dispatch({type:UPLOAD_PRODUCT_FAILURE,payload:error.response.data});
            AlertActions.setAlert(error.response.data.errors[0].msg,"danger");
            navigate("/");

        }


    }
}

export const getMenProductsCollection = ()=>{
    return async (dispatch) =>{
        try{

                dispatch({type:GET_MENS_PRODUCTS_REQUEST});
                let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/men`;
                let response = await axios.get(dataURL);
                dispatch({type:GET_MENS_PRODUCTS_SUCCESS,payload:response.data.products});

            }
        catch(error){
            console.error(error);
            dispatch({type:GET_MENS_PRODUCTS_FAILURE,payload:error.response.data});
            AlertActions.setAlert(error.response.data.errors[0].msg,"danger")

        }


    }
}

export const getWomenProductsCollection = ()=>{
    return async (dispatch) =>{
        try{
            dispatch({type:GET_WOMEN_PRODUCTS_REQUEST});
            let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/women`;
            let response = await axios.get(dataURL);
            dispatch({type:GET_WOMEN_PRODUCTS_SUCCESS,payload:response.data.products});

        }
        catch(error){
            console.error(error);
            dispatch({type:GET_WOMEN_PRODUCTS_FAILURE,payload:error.response.data});
            AlertActions.setAlert(error.response.data.errors[0].msg,"danger")

        }


    }
}


export const getKidsProductsCollection = ()=>{
    return async (dispatch) =>{
        try{

            dispatch({type:GET_KIDS_PRODUCTS_REQUEST});
            let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/kids`;
            let response = await axios.get(dataURL);
            dispatch({type:GET_KIDS_PRODUCTS_SUCCESS,payload:response.data.products});

        }
        catch(error){
            console.error(error);
            dispatch({type:GET_KIDS_PRODUCTS_FAILURE,payload:error.response.data});
            AlertActions.setAlert(error.response.data.errors[0].msg,"danger")

        }


    }
}

export const getProductDetails = (productId)=>{
    return async(dispatch)=>{
        dispatch({type:GET_PRODUCT_DETAILS_REQUEST});
        try{
            let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
            let response = await axios.get(dataURL);
            console.log(response.data);
            dispatch({type:GET_PRODUCT_DETAILS_SUCCESS,payload:response.data});

        }
        catch(error){
            console.error(error);
            dispatch({type:GET_KIDS_PRODUCTS_FAILURE,payload:error.response.data.errors[0].msg});
        }
    }
}