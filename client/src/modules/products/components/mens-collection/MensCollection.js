import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as ProductActions from "../../../../redux/products/product.actions";
import Spinner from "../../../layout/components/spinner/Spinner";
import {NavLink, useNavigate} from "react-router-dom";
import * as orderActions from "../../../../redux/orders/order.actions";


let MensCollection = (props)=>{
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let productState = useSelector((state)=>{
        return state.product;
    });


    useEffect(()=>{
        dispatch(ProductActions.getMenProductsCollection());
    },[]);

    let products = productState.products;
    let loading = productState.loading;

    let clickAddToCart = (product)=>{
        dispatch(orderActions.addToCart(product,1,navigate));
    }

    return (

        <React.Fragment>
            <section className="bg-brown tex-black p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-weight-bold">Men's Collection</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                (loading)?<Spinner></Spinner>:
                    <React.Fragment>

                        <section className="container mt-3">
                            <div className="row">
                                {
                                    products.length>0 && products.map((product)=>{
                                        return (
                                            <div key={product._id} className="col-md-3">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <NavLink to={`/products/${product._id}`}>
                                                            <img src={product.image} className="card-img" width="200px" height="350px"/>
                                                        </NavLink>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                <p className="h4">{product.name}</p>
                                                                <p className="h5">&#8377; {product.price}</p>
                                                                <button onClick={clickAddToCart.bind(this,product)} className="btn btn-brown ">Add To Cart</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })

                                }

                            </div>

                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default MensCollection;