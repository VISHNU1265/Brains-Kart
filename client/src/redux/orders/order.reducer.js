import * as orderActions from "./order.actions";

export const initialState = {
  loading:false,
  cartItems:[],
  orders:[],
  errorMessage:""
}

export const reducer = (state=initialState,action)=>{
  let {type,payload} = action;
  switch(type){
    case orderActions.ADD_TO_CART:
      let isExist = state.cartItems.filter((item)=>{
        return item._id === action.payload.product._id;
      });
      if(isExist.length==1){
        return{
          ...state
        }
      }
      else{
        return {
          ...state,
          cartItems:[...state.cartItems,payload.product]
        }
      }
    case orderActions.ADD_TO_CART_FAILURE:
      return{
        ...state,
        errorMessage:payload
      }
    case orderActions.DELETE_CART_ITEM:
      var updatedCart = state.cartItems.filter((product)=>{
          return (product._id !== payload.productId)
      });
      return {
        ...state,
        cartItems:[
          ...updatedCart
        ]
      }
    case orderActions.DELETE_CART_ITEM_FAILURE:
        return{
          ...state,
          errorMessage:payload
        }
    case orderActions.INCR_QTY:
      var updatedCart = state.cartItems.map((product)=>{
        if(product._id === payload.productId){
          return {
            ...product,
            qty:product.qty+1
          }
        }
        else{
          return product;
        }
      });
      return {
        ...state,
        cartItems:[
          ...updatedCart
        ]
      }
    case orderActions.DECR_QTY:
      var updatedCart = state.cartItems.map((product)=>{
        if(product._id === payload.productId){
          return {
            ...product,
            qty:(product.qty>1)?product.qty-1:0
          }
        }
        else{
          return product;
        }
      });
      return {
        ...state,
        cartItems:[
          ...updatedCart
        ]
      }
    case orderActions.INCR_QTY_FALURE:
      return {
        ...state,
        errorMessage:payload
      }
    case orderActions.DECR_QTY_FAILURE:
      return {
        ...state,
        errorMessage:payload
      }
    case orderActions.DELETE_STATE:
        return{
          loading:false,
          cartItems:[],
          orders:[],
          errorMessage:""
        }
    default:
      return state;
        
  }
}