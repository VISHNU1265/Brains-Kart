import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import * as ProductActions from "../../../../redux/products/product.actions";
import Spinner from "../../../layout/components/spinner/Spinner";
import * as orderActions from "../../../../redux/orders/order.actions";

let ProductDetails = (props)=>{


  let [state,setState] = useState({
    qty:""
  });

  let productId = useParams().productId;

  let dispatch  = useDispatch();

  let navigate = useNavigate();


  let productState = useSelector((state)=>{
      return state.product;
  });

  useEffect(()=>{
    function util(){
      console.log("Hello");
      dispatch(ProductActions.getProductDetails(productId));
    }
    util();
  },[productId]);

  let updateQuantity = (event)=>{
    setState({
      ...state,
      qty:event.target.value
    })
  };


  


  let submitAddToCart = (event)=>{
    event.preventDefault();
    dispatch(orderActions.addToCart(product,Number(state.qty),navigate));

  }

  let {loading,product,errorMessage} = productState;

  

  return (
    <React.Fragment>
       <section className="bg-brown tex-black p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-weight-bold">Selected Product</h3>
                        </div>
                    </div>
                </div>
        </section>
          {
            loading?<Spinner></Spinner>:
            <React.Fragment>
              {
                Object.keys(product).length>0 && 
                <section className="mt-3 container">
                    <div className="row">
                   
                        <div className="col-md-6 align-items-center text-center">
                          <img src={product.image} className="img-fluid" ></img>
                        </div>
                        <div className="col-md-6 text-let">
                          <p className="h3">Name: <b>{product.name}</b> </p>
                          <p className="h3">Brand: <b>{product.brand}</b> </p>
                          <p className="h3">Price: <b className="text-danger">&#8377; {product.price}</b> </p>

                          <form className="form-group" onSubmit={submitAddToCart.bind(this)}>
                              <select name="qty" required
                              onChange={updateQuantity.bind(this)}
                              value={state.qty} 
                              className="form-control w-25">
                                <option value="">Select Qty</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <input type="submit" value="ADD TO CART" className="btn btn-sm btn-brown p-3s"></input>
                          </form>

                          <p>{product.description}</p>
                          <p>{product.usage}</p>
                        </div>
                      
                    </div>
                </section>
              }
            </React.Fragment>
          }
      

    </React.Fragment>
  )
}

export default ProductDetails;
