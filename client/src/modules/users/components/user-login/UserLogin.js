import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import brandImg from "../../../../assets/img/brand.png";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as UserActions from "../../../../redux/users/user.actions";

let UserLogin = (props)=>{

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let [loginState,setLoginState] = useState({
        email:"",
        password:""
    });

    let [loginErrorState,setLoginErrorState] = useState({
        emailError:"",
        passwordError:""
    });

    let validateEmail = (event)=>{
        setLoginState({
            email:event.target.value
        });
        let regexExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regexExp.test(event.target.value)){
            setLoginErrorState({
                ...loginErrorState,
                emailError:"Enter Valid Email"
            });
        }
        else{
            setLoginErrorState({
            ...loginErrorState,
            emailError:""
        });

        }

    }

    let validatePassword = (event)=>{
        setLoginState({
            ...loginState,
            password:event.target.value
        });
        let regexExp =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(!regexExp.test(event.target.value)){
            setLoginErrorState({
                ...loginErrorState,
                passwordError:"Enter Valid Password"
            });
        }
        else{
            setLoginErrorState({
                ...loginErrorState,
                passwordError:""
            });

        }
    }

    let loginSubmit = (event)=>{
        event.preventDefault();
        dispatch(UserActions.loginUser({...loginState},navigate));

    }

    return (
        <React.Fragment>
            <section className="bg-brown tex-black p-3">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex align-items-center">

                            <h3 className="font-weight-bold ">
                                <i className="fa fa-sign-in-alt m-2"></i>Login
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mt-3">
                <div className="row">
                    <div className="col-md-4 m-auto">
                        <div className="card">
                            <div className="card-header bg-dark">
                                <h3 className="font-weight-bold text-brown">Login</h3>
                            </div>
                            <div className="card-body bg-form-light">
                                <form onSubmit={loginSubmit.bind(this)}>
                                    <div className="form-group mt-3">
                                        <input type="email" value={loginState.email} onChange={validateEmail.bind(this)} className={`form-control ${(loginErrorState.emailError.length>0)?'is-invalid':''}`} placeholder="Email"/>
                                        <small className="text-danger">{loginErrorState.emailError}</small>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="password" value={loginState.password} onChange={validatePassword.bind(this)}  className={`form-control ${(loginErrorState.passwordError.length>0)?'is-invalid':''}`} placeholder="Password"/>
                                        <small className="text-danger">{loginErrorState.passwordError}</small>
                                    </div>
                                    <div className="mt-2">
                                        <input type="submit" className="btn btn-dark  text-brown" value="Login"/>
                                    </div>
                                    <span>New to BrainsKart?
                                    <NavLink to="/users/register" className="p-2 font-weight-bold">
                                        Register
                                    </NavLink>
                                    </span>
                                </form>
                            </div>
                            <div className="card-footer bg-dark text-center">
                                <img src={brandImg} width={130} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default UserLogin;