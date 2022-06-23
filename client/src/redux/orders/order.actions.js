import { AuthUtil } from "../../util/AuthUtil";

export const ADD_TO_CART = `ADD_TO_CART`;

export const ADD_TO_CART_FAILURE = `ADD_TO_CART_FAILURE`;

export const DELETE_CART_ITEM = `DELETE_CART_ITEM`;

export const DELETE_CART_ITEM_FAILURE = `DELETE_CART_ITEM_FAILURE`;

export const INCR_QTY = `INCR_QTY`;

export const DECR_QTY = `DECR_QTY`;

export const INCR_QTY_FALURE = `INCR_QTY_FALURE`;

export const DECR_QTY_FAILURE = `DECR_QTY_FAILURE`;

export const DELETE_STATE = `DELETE_STATE`

export const addToCart = (product,qty,navigate)=>{
  return (dispatch)=>{
    try{
        if(AuthUtil.isLoggedIn()){
          product.qty=qty;
          dispatch({type:ADD_TO_CART,payload:{product:product}});
        }
       
        navigate("/orders/cart")
      
    }
    catch(error){
      console.error(error);
      dispatch({type:ADD_TO_CART_FAILURE,payload:error});
    }

  }
}

export const deleteToCart = (productId)=>{
  return (dispatch)=>{
    try{
      if(AuthUtil.isLoggedIn()){
        dispatch({type:DELETE_CART_ITEM,payload:{productId:productId}});
      }
    }
    catch(error){
      console.error(error);
      dispatch({type:DELETE_CART_ITEM_FAILURE,payload:error});
    }
  }
}

export const incrQty = (productId)=>{
  return (dispatch)=>{
    try{
      if(AuthUtil.isLoggedIn()){
        dispatch({type:INCR_QTY,payload:{productId:productId}});
      }
    }
    catch(error){
      console.error(error);
      dispatch({type:INCR_QTY_FALURE,payload:error});
    }
  }
}


export const decrQty = (productId)=>{
  return (dispatch)=>{
    try{
      if(AuthUtil.isLoggedIn()){
        dispatch({type:DECR_QTY,payload:{productId:productId}});
      }
    }
    catch(error){
      console.error(error);
      dispatch({type:DECR_QTY_FAILURE,payload:error});
    }
  }
}

export const deleteState = ()=>{
  return {
    type:DELETE_STATE
  }
}