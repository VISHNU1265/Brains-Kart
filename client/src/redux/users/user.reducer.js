import * as UserActions from "./user.actions";

export const initialState = {
    loading:false,
    user:{
        name:"",
        email:"",
        password:""
    },
    token:"",
    isAuthenticated:false,
    errorMessage:"",
}

export const reducer = (state=initialState,action)=>{
    let {type,payload} = action;
    switch (type){
        case UserActions.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case UserActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                errorMessage: "",

            }
        case UserActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage: payload.msg
            }
        case UserActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: false,
            }
        case UserActions.LOGIN_USER_SUCCESS:
            localStorage.setItem(process.env.REACT_APP_FEATURE_KEY,payload.token);
            return {
                ...state,
                loading: false,
                errorMessage: "",
                isAuthenticated: true,
                token: payload.token
            }
        case UserActions.LOGIN_USER_FAILURE:
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY);

            return {
                ...state,
                loading: false,
                errorMessage:payload,
                isAuthenticated: false,
                token: ""
            }
        case UserActions.LOGOUT_USER:
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY);
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token:"",
                user:{
                    name:"",
                    email:"",
                    password:""
                }
            }
        case UserActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading:true
            }
        case UserActions.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user:{
                    ...payload
                }
            }
        case UserActions.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload

            }
        case UserActions.UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case UserActions.UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading:false,
            }
        case UserActions.UPDATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage:payload
            }
        default:
            return state;
    }
}


