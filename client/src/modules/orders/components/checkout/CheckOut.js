import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CartUtil from "../../../../util/CartUtil";
let CheckOut = (props)=>{

    let cartState = useSelector((state)=>{
        return state.orders;
    });


    let userState = useSelector((state)=>{
        return state.register;
    });

    let {cartItems} = cartState;

    let {user,loading} = userState;

    return (
        <React.Fragment>
            <section className="bg-brown tex-black p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h3 className="font-weight-bold">
                                    <i className='fa fa-shopping-cart p-2'></i>
                                    CheckOut Items</h3>
                                </div>
                            </div>
                        </div>
            </section>
            <section className='container mt-3'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='card'>
                            <div className='card-header bg-dark text-brown'>
                                <div className='row'>
                                    <div className='col-md-9'>
                                        <h3>Billing Address</h3>
                                    </div>
                                    <div className='col-md-3 text-center'>
                                        <NavLink to="/users/profile">
                                            <button className='btn btn-brown '>
                                                UPDATE ADDRESS
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body bg-brown'>
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        Mobile : {(user && user.address)?user.address.mobile:""}
                                    </li>
                                    <li className='list-group-item'>
                                        Flat : {(user && user.address)?user.address.flat:""}
                                    </li>
                                    <li className='list-group-item'>
                                        Street : {(user && user.address)?user.address.street:""}
                                    </li>
                                    <li className='list-group-item'>
                                        Landmark : {(user && user.address)?user.address.landmark:""}
                                    </li>
                                    <li className='list-group-item'>
                                        City : {(user && user.address)?user.address.city:""}
                                    </li>
                                    <li className='list-group-item'>
                                        State : {(user && user.address)?user.address.state:""}
                                    </li>
                                    <li className='list-group-item'>
                                        Country :{(user && user.address)?user.address.country:""}
                                    </li>
                                    <li className='list-group-item'>
                                        Pin : {(user && user.address)?user.address.pin:""}
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                        <div className='card my-3'>
                            <div className='card-header bg-dark text-brown'>
                                <h3>Payment Details</h3>
                            </div>
                            <div className='card-body'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="cod" id="cod" disabled/>
                                <label class="form-check-label" for="cod">
                                    Cash on Delivery
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="pwc" id="pwc" checked />
                                <label class="form-check-label" for="pwc">
                                    Payment with Card
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card'>
                            <div className='card-header  bg-dark text-brown'>
                                <h3>Your Cart</h3>
                            </div>
                            <div className='card-body'>
                                {
                                    cartItems.length>0 && 
                                    cartItems.map((product)=>{
                                        return (
                                            <section className='m-2'>
                                                <div className='row shadow my-2 p-2'>
                                                    <div className='col-md-3 d-flex align-items-center justifyc-content-center  text-center'>
                                                        <img src={product.image} className="img-fluid" width="40" ></img>
                                                    </div>
                                                    <div className='col-md-9 d-flex flex-column justify-content-center align-items-left'>
                                                        <p>{product.name}</p>
                                                        <p>&#8377; {product.price}</p>
                                                        <p>Qty: {product.qty}</p>
                                                    </div>

                                                    </div>
                                            </section>
                                        )
                                    })

                                }
                                
                                {
                                    cartItems.length>0 && 
                                    <section>
                                        <ul className='list-group'>
                                            <li className='list-group-item bg-brown'>
                                                Total : &#8377; {CartUtil.getTotal(cartItems)}
                                            </li>
                                            <li className='list-group-item bg-brown'>
                                                Tax : &#8377; {CartUtil.getTax(cartItems)}
                                            </li>
                                            <li className='list-group-item bg-brown'>
                                                Grand Total : &#8377; {CartUtil.getGrandTotal(cartItems)}
                                            </li>
                                        </ul>
                                        <button className='btn btn-danger'>PAYNOW</button>
                                    </section>

                                }
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </React.Fragment>
    )
}

export default CheckOut;