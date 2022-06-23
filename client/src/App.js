import './App.css';
import React from 'react';
import NavBar from "./modules/layout/components/navbar/NavBar";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import MensCollection from "./modules/products/components/mens-collection/MensCollection";
import WomensCollection from "./modules/products/components/womens-collection/WomensCollection";
import KidsCollection from "./modules/products/components/kids-collection/KidsCollection";
import UploadProduct from "./modules/products/components/upload-product/UploadProduct";
import OrderList from "./modules/orders/components/orders-list/OrderList";
import UserLogin from "./modules/users/components/user-login/UserLogin";
import UserRegister from "./modules/users/components/user-register/UserRegister";
import Cart from "./modules/orders/components/cart/Cart";
import Home from "./modules/layout/components/home/Home";
import Alert from "./modules/layout/components/alert/Alert";
import {useEffect} from "react";
import * as UserActions from "./redux/users/user.actions";
import {useDispatch} from "react-redux";
import Spinner from "./modules/layout/components/spinner/Spinner";
import ProductDetails from './modules/products/components/product-details/ProductDetails';
import UserProfile from "./modules/users/components/user-profile/UserProfile";
import CheckOut from './modules/orders/components/checkout/CheckOut';
import PrivateRoute from "./router/PrivateRoute";

let App = ()=>{

    let dispatch = useDispatch();

    useEffect(()=>{
        function util(){
            dispatch(UserActions.getUserInfo());
        }
        util();
    },[]);

  return (

    <React.Fragment>
      <Router>
          <Alert></Alert>
        <NavBar></NavBar>
        <Routes>
            <Route exact={true} path={"/"} element={<Home/>}>

            </Route>
            <Route exact={true} path={"/products/mens"} element={<MensCollection/>}>

            </Route>
            <Route exact={true} path={"/products/womens"} element={<WomensCollection/>}>

            </Route>
            <Route exact={true} path={"/products/kids"} element={<KidsCollection/>}>

            </Route>
            
            <Route exact={true} path={"/products/:productId"} element={<ProductDetails/>}/>
           

            <Route exact={true} path={"/products/upload"} element={<PrivateRoute/>}>
              <Route exact={true} path={"/products/upload"} element={<UploadProduct/>}>

              </Route>
            </Route>

            

            <Route exact={true} path={"/orders/cart"} element={<PrivateRoute/>}>
                <Route exact={true} path={"/orders/cart"} element={<Cart/>}>

                </Route>
            </Route>

            <Route exact={true} path={"/orders/list"} element={<PrivateRoute/>}>
                <Route exact={true} path={"/orders/list"} element={<OrderList/>}>

                </Route>
            </Route>

            <Route exact={true} path={"/orders/checkout"} element={<PrivateRoute/>}>
              <Route exact={true} path={"/orders/checkout"} element={<CheckOut/>}>

              </Route>
            </Route>


            <Route exact={true} path={"/users/login"} element={<UserLogin/>}>

            </Route>
            <Route exact={true} path={"/users/register"} element={<UserRegister/>}>

            </Route>
            <Route exact={true} path={"/users/profile"} element={<PrivateRoute/>}>
              <Route exact={true} path={"/users/profile"} element={<UserProfile/>}>

              </Route>  
            </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
