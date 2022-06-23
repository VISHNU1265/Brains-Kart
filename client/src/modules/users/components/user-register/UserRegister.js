import React from 'react';
import {NavLink,useNavigate} from "react-router-dom";
import brandImg from "../../../../assets/img/brand.png";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as UserActions from "../../../../redux/users/user.actions";

let UserRegister = (props)=>{
    let dispatch = useDispatch();
    let navigate  = useNavigate();


    let [userState,setUserState] = useState({
        name:"",
        email:"",
        password:""
    });

    let [userErrorState,setUserErrorState] = useState({
        nameError:"",
        emailError:"",
        passwordError:"",
    });




    let validateName = (event)=>{
        setUserState({
            ...userState,
            name:event.target.value
        })
        let regExp = /^[A-Za-z0-9]{5,10}$/;
        if(!regExp.test(event.target.value)){
            setUserErrorState({
                ...userErrorState,
                nameError:"Enter a Valid Name"
            })
        }
        else{
            setUserErrorState({
                ...userErrorState,
                nameError:""
            })
        }
    };

    let validateEmail = (event)=>{
        setUserState({
            ...userState,
            email:event.target.value
        })
        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regExp.test(event.target.value)){
            setUserErrorState({
                ...userErrorState,
                emailError:"Enter a Valid Email"
            })
        }
        else{
            setUserErrorState({
                ...userErrorState,
                emailError:""
            })
        }
    };

    let validatePassword = (event)=>{
        setUserState({
            ...userState,
            password:event.target.value
        })
        let regExp =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(!regExp.test(event.target.value)){
            setUserErrorState({
                ...userErrorState,
                passwordError:"Enter a Valid Password"
            })
        }
        else{
            setUserErrorState({
                ...userErrorState,
                passwordError:""
            })
        }

    }


    let submitRegister = (event)=>{
        event.preventDefault();
        dispatch(UserActions.registerUser({...userState},navigate));
    }

    return (
        <React.Fragment>
            <section className="bg-brown tex-black p-3">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex align-items-center">

                            <h3 className="font-weight-bold ">
                                <i className="fa fa-user-cog m-2"></i>Register
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
                                <h3 className="font-weight-bold text-brown">Register</h3>
                            </div>
                            <div className="card-body bg-form-light">

                                <form action="" onSubmit={submitRegister.bind(this)}>
                                    <div className="form-group mt-3">
                                        <input type="name" name="name" value={userState.name} className={`form-control ${userErrorState.nameError.length>0?'is-invalid':''}`} onChange={validateName.bind(this)} placeholder="Name"/>
                                        <small className="red-text">{userErrorState.nameError}</small>

                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="email" name="email" onChange={validateEmail.bind(this)} className={`form-control ${userErrorState.emailError.length>0?'is-invalid':''}`} placeholder="Email"/>
                                        <small className="red-text">{userErrorState.emailError}</small>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="password" className={`form-control ${userErrorState.passwordError.length>0?'is-invalid':''}`} onChange={validatePassword.bind(this)} placeholder="Password"/>
                                        <small className="red-text">{userErrorState.passwordError}</small>

                                    </div>
                                    <div className="mt-2">
                                        <input type="submit" className="btn btn-dark  text-brown" value="Register"/>
                                    </div>
                                    <span>Already Have an Account?
                                    <NavLink to="/users/login" className="p-2 font-weight-bold">
                                        Login
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

export default UserRegister;