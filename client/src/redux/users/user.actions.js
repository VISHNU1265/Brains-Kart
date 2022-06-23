import axios from "axios";
import * as alertActions from "../alert/alert.actions";
import {AuthUtil} from "../../util/AuthUtil";
import {TokenUtil} from "../../util/TokenUtil";

export const REGISTER_USER_REQUEST = `REGISTER_USER_REQUEST`;
export const REGISTER_USER_SUCCESS = `REGISTER_USER_SUCCESS`;
export const REGISTER_USER_FAILURE = `REGISTER_USER_FAILURE`;

export const LOGIN_USER_REQUEST = `LOGIN_USER_REQUEST`;
export const LOGIN_USER_SUCCESS = `LOGIN_USER_SUCCESS`;
export const LOGIN_USER_FAILURE = `LOGIN_USER_FALURE`;


export const GET_USER_INFO_REQUEST = `GET_USER_INFO_REQUEST`;
export const GET_USER_INFO_SUCCESS = `GET_USER_INFO_SUCCESS`;
export const GET_USER_INFO_FAILURE = `GET_USER_INFO_FAILURE`;

export const UPDATE_ADDRESS_REQUEST = `UPDATE_ADDRESS_REQUEST`;
export const UPDATE_ADDRESS_SUCCESS = `UPDATE_ADDRESS_SUCCESS`;
export const UPDATE_ADDRESS_FAILURE = `UPDATE_ADDRESS_FAILURE`;


export const LOGOUT_USER = `LOGOUT_USER`;


export const registerUser = (user,navigate)=>{
    return async (dispatch)=>{
        dispatch({type:REGISTER_USER_REQUEST});
        try{
            let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/users/register`;
            let response = await axios.post(dataURL,user);
            dispatch({type:REGISTER_USER_SUCCESS,payload:response.data});
            dispatch(alertActions.setAlert(response.data.msg,'success'));
            navigate("/users/login");
        }
        catch (error){
            console.error(error.response.data);
            dispatch({type:REGISTER_USER_FAILURE,payload:error.response.data});
            dispatch(alertActions.setAlert(error.response.data.msg,"danger"));
            navigate("/");


        }
    }
}

export const loginUser = (user,navigate)=>{
    return async (dispatch)=>{
        dispatch({type:LOGIN_USER_REQUEST});
        try{
            let dataURL = `${process.env.REACT_APP_SERVER_URL}/api/users/login`;
            let response = await axios.post(dataURL,user);
            dispatch({type:LOGIN_USER_SUCCESS,payload:response.data});
            dispatch(alertActions.setAlert(response.data.msg,'success'));
            dispatch(getUserInfo());
            navigate("/");
        }
        catch (error){
            console.error(error.response.data)
            dispatch({type:LOGIN_USER_FAILURE,payload:error.response.data});
            dispatch(alertActions.setAlert(error.response.data.errors[0].msg,"danger"))
            navigate("/");

        }
    }
}

export const logoutUser = ()=>{
    return{
        type:LOGOUT_USER,
    }
}

export const getUserInfo = (navigate)=>{
    return async (dispatch)=>{
        try{
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                dispatch({type:GET_USER_INFO_REQUEST});
                let dataURl = `${process.env.REACT_APP_SERVER_URL}/api/users/`;
                let response = await axios.get(dataURl);
                dispatch({type:GET_USER_INFO_SUCCESS,payload:response.data.user});
            }
        }
        catch (error){
            console.error(error.response.data);
            dispatch({type:GET_USER_INFO_FAILURE,payload:error.response.data});

        }

    }
}

export const updateAddress = (address,navigate)=>{
    return async (dispatch)=>{
        try{
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                dispatch({type:UPDATE_ADDRESS_REQUEST});
                let dataURl = `${process.env.REACT_APP_SERVER_URL}/api/users/address`;
                let response = await axios.post(dataURl,address);
                dispatch(getUserInfo(navigate));
                dispatch({type:UPDATE_ADDRESS_SUCCESS});
                dispatch(alertActions.setAlert(response.data.msg,"success"));
                navigate("/users/profile");
            }
        }
        catch (error){
            console.error(error.response.data);
            dispatch({type:UPDATE_ADDRESS_FAILURE,payload:error.response.data.errors[0].msg});

        }

    }
}