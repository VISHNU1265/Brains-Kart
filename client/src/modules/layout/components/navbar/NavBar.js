import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import brandImg from "../../../../assets/img/brand.png"
import {AuthUtil} from "../../../../util/AuthUtil";
import {useDispatch, useSelector} from "react-redux";
import * as UserActions from "../../../../redux/users/user.actions";
import * as orderActions from "../../../../redux/orders/order.actions";

let NavBar = (props)=>{

    let dispatch = useDispatch();
    let userState = useSelector((state)=>{
        return state.register;
    });

    let orderState = useSelector((state)=>{
        return state.orders;
    });




    let logoutUser = (event)=>{
        dispatch(UserActions.logoutUser());
        dispatch(orderActions.deleteState());
    }



    let user = userState.user;
    let authenticated = userState.isAuthenticated;
    let admin = userState.isAdmin;
    console.log(authenticated);

    let {cartItems} = orderState;



    return (
        <React.Fragment>
            <nav className="navbar-brand navbar w-100 bg-dark navbar-expand-sm  navbar-dark">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        <img className="navbar-brand" src={brandImg} width={130}  alt=""/>
                    </NavLink>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/products/mens" className="nav-link">Men's Wear</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products/kids" className="nav-link">kid's Wear</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products/womens" className="nav-link">Women's Wear</NavLink>
                        </li>
                        {
                            ((AuthUtil.isLoggedIn() && authenticated))?
                            <li className="nav-item">
                                <NavLink to="/products/upload" className="nav-link">Upload</NavLink>
                            </li>:""
                        }
                        
                        {
                            (AuthUtil.isLoggedIn() && authenticated)? 
                            <li className="nav-item">
                            <NavLink to="/orders/cart" className="nav-link">
                                <i className="fa fa-shopping-cart"></i>
                                {
                                    cartItems.length>0 && <span className="badge badge-danger badge-pill">{cartItems.length}</span>
                                }
                            </NavLink>
                        </li>:""
                        }
                        
                        {
                            (AuthUtil.isLoggedIn() && authenticated)? 
                            <li className="nav-item">
                                <NavLink to="/orders/list" className="nav-link">Orders</NavLink>
                            </li>:""
                        }
                        

                    </ul>
                    <ul className="navbar-nav">

                        {
                            (AuthUtil.isLoggedIn() && authenticated) ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/users/profile"   className="nav-link">
                                            <img src={user.avatar} width="25" height="25" className="rounded-circle" alt=""/>
                                            &nbsp; {user.name}
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/"  onClick={logoutUser.bind(this)} className="nav-link">
                                            <i className="fa fa-sign-out-alt m-1"></i>
                                            Logout
                                        </NavLink>
                                    </li>
                            </React.Fragment>:
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/users/login" className="nav-link">
                                            <i className="fa fa-sign-in-alt m-1"></i>
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/users/register" className="nav-link">
                                            <i className="fa fa-user-cog m-1"></i>
                                            Register
                                        </NavLink>
                                    </li>
                            </React.Fragment>
                        }





                    </ul>

                    
                </div>
            </nav>


        </React.Fragment>
    )
}

export default NavBar;