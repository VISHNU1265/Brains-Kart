import React from 'react';
import {useSelector,useDispatch} from "react-redux"
import { NavLink } from 'react-router-dom';
import CartUtil from "../../../../util/CartUtil";
import * as orderActions from "../../../../redux/orders/order.actions";

let Cart = (props)=>{

    let ordersState = useSelector((state)=>{
        return state.orders;
    });

    let dispatch = useDispatch();

    let deleteCartItem = (productId)=>{
        dispatch(orderActions.deleteToCart(productId));
    }

    let incrQty = (productId)=>{
        dispatch(orderActions.incrQty(productId));
    }

    let decrQty = (productId)=>{
        dispatch(orderActions.decrQty(productId));
    }

    let {loading,cartItems} = ordersState;

    return (
        <React.Fragment>
           {
               (cartItems.length > 0) ?
               <React.Fragment>
                    <section className="bg-brown tex-black p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h3 className="font-weight-bold">
                                    <i className='fa fa-shopping-cart p-2'></i>
                                    Your Cart</h3>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='container mt-3'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='card'>
                                    <div className='card-header bg-dark text-brown'>
                                        <h2>Your Cart Items</h2>
                                    </div>
                                    <div className='card-body bg-brown text-brown m-2'>
                                        <table className="table table-hover text-center bg-brown">
                                            <thead className=''>
                                                <tr>
                                                    <th>SNO</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItems.map((cartItem,index)=>{
                                                        return(
                                                            <tr key={cartItem._id} className=''>
                                                                <td>{index+1}</td>
                                                                <td>
                                                                    <img src={cartItem.image} width="25"  heigh="50" className='img-fluids'></img>
                                                                </td>
                                                                <td>
                                                                    {cartItem.name}
                                                                </td>
                                                                <td>
                                                                    {cartItem.price}
                                                                </td>
                                                                <td>
                                                                    <i onClick={decrQty.bind(this,cartItem._id)}  className='fa fa-minus-circle p-2'></i>
                                                                    {cartItem.qty}
                                                                    <i onClick={incrQty.bind(this,cartItem._id)} className='fa fa-plus-circle p-2'></i>
                                                                </td>
                                                                <td>
                                                                    <button onClick={deleteCartItem.bind(this,cartItem._id)} className='btn btn-danger'>DELETE</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })

                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <div className='card-header bg-dark text-brown'>
                                        <h2>Your Total</h2>
                                    </div>
                                    <div className='card-body p-2'>
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
                                        
                                        <NavLink to="/orders/checkout">
                                            <button className='btn btn-success'>
                                                CHECK OUT
                                            </button>
                                        </NavLink>
                                        
                                        <NavLink to="/">
                                            <button className='btn btn-primary'>
                                                SHOP MORE
                                            </button>
                                        </NavLink>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>:
                <React.Fragment>
                    <section className='text-center'>
                    `       <p className='h1'>-----------------Your Cart is Empty-----------------</p>
                            <p className='h3'>Please Shop <NavLink to="/">Here </NavLink></p>
                    </section>
                </React.Fragment>

           }
        </React.Fragment>
    )
}

export default Cart;