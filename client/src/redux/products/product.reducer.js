import * as productActions from "./product.actions";

export const initialState = {
    loading:false,
    product:{},
    products:[],
    errorMessage:""
}

export const reducer = (state=initialState,action)=>{
    switch(action.type){
        case productActions.UPLOAD_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true
            }
        case productActions.UPLOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case productActions.UPLOAD_PRODUCT_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage:action.payload,
                product: {}
            }
        case productActions.GET_MENS_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productActions.GET_MENS_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products:action.payload
            }
        case productActions.GET_MENS_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage:action.payload,
            }
        case productActions.GET_WOMEN_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true

            }
        case productActions.GET_WOMEN_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case productActions.GET_WOMEN_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }
        case productActions.GET_KIDS_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true

            }
        case productActions.GET_KIDS_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case productActions.GET_KIDS_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            }
        case productActions.GET_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case productActions.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading:false,
                product:action.payload,
            }
        case productActions.GET_PRODUCT_DETAILS_FAILURE:
            return {
                ...state,
                loading:false,
                errorMessage:action.payload
            }

        default:
            return state;
    }
}