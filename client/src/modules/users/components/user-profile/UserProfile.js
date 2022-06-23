import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UserActions from "../../../../redux/users/user.actions";
import Spinner from "../../../layout/components/spinner/Spinner";



let UserProfile = (props)=>{


    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [addressState,setAddressState] = useState({
        flat:"",
        street:"",
        landmark:"",
        city:"",
        state:"",
        country:"",
        pin:"",
        mobile:"",
    });

    let userState = useSelector((state)=>{
        return state.register;
    });

    let {loading,user} = userState;


    useEffect(()=>{
        let util = ()=>{
            setAddressState({
                ...addressState,
                mobile:(user && user.address)?user.address.mobile:"",
                flat:(user && user.address)?user.address.flat:"",
                street:(user && user.address)?user.address.street:"",
                state:(user && user.address)?user.address.state:"",
                city:(user && user.address)?user.address.city:"",
                country:(user && user.address)?user.address.country:"",
                landmark:(user && user.address)?user.address.landmark:"",
                pin:(user && user.address)?user.address.pin:"",

            });
        }
        util();
    },[user]);

    let [profileState,setProfileState] = useState({
        isSwitched:false
    });

    let changeEnableAddress = ()=>{
        setProfileState({
            ...profileState,
            isSwitched:!(profileState.isSwitched)
        })
    }



    let changeAddress = (event)=>{
        setAddressState({
            ...addressState,
            [event.target.name]:event.target.value
        });
    }

    let submitUpdateAddress = (event)=>{
        event.preventDefault();
        dispatch(UserActions.updateAddress(addressState,navigate));
        setProfileState({
            isSwitched:false
        })
        
    }


    return (
        <React.Fragment>
            <section className="bg-brown tex-black p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-weight-bold">
                                <i className='fa fa-user-circle p-2'></i>
                                Your Profile
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        
            {
                (loading)?<Spinner></Spinner>:
                <React.Fragment>
                    <section className='container mt-3'>
                <div className='row'>
                    <div className='col-md-4 mt-3 text-center'>
                        <img src={(user)?user.avatar:""} className="card-img rounded-circle w-50  profile-img"></img>
                    </div>

    
                    <div className='col-md-8'>
                            <div className='card mt-3'>
                                <div className='card-header bg-dark text-brown'>
                                    <h3>Your Information</h3>
                                </div>
                                <div className='card-body bg-brown'>
                                    <ul className='list-group'>
                                        <li className='list-group-item'>
                                            Name : {(user)?user.name:""}
                                        </li>
                                        <li className='list-group-item'>
                                            Email : {(user)?user.email:""}
                                        </li>
                                        <li className='list-group-item'>
                                            Mobile : {(user && user.address)?user.address.mobile:""}
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            <div className='card my-3'>
                                <div className='card-header bg-dark text-brown'>
                                    <div className='row'>
                                        <div className='col-md-9'>
                                            <h3>Billing Information</h3>
                                        </div>
                                        <div className='col-md-3 text-center'>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" value={profileState.isSwitched}  onChange={changeEnableAddress.bind(this)} type="checkbox" ></input>
                                                <label class="form-check-label">Enable Address</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                <div className='card-body bg-brown'>
                                    {
                                        (!profileState.isSwitched)? 
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
                                    
                                        </ul>:
                                            <React.Fragment>
                                                <form onSubmit={submitUpdateAddress.bind(this)}>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">Mobile</span>
                                                            <input required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.mobile}
                                                             type="text" class="form-control" name="mobile"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">Flat</span>
                                                            <input required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.flat}
                                                             type="text" class="form-control" name="flat"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">Street</span>
                                                            <input required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.street}
                                                             type="text" class="form-control" name="street"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">Landmark</span>
                                                            <input  required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.landmark}
                                                             type="text" class="form-control" name="landmark"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">City</span>
                                                            <input  required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.city}
                                                             type="text" class="form-control" name="city"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">State</span>
                                                            <input required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.state}
                                                             type="text" class="form-control" name="state"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">Country</span>
                                                            <input required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.country}
                                                            type="text" class="form-control" name="country"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text bg-dark text-brown">Pin</span>
                                                            <input required
                                                            onChange={changeAddress.bind(this)}
                                                            value = {addressState.pin}
                                                            type="text" class="form-control" name="pin"></input>
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <input type="submit" className='btn btn-success' value="update" ></input>
                                                    </div>
                                                    
                                                </form>
                                            </React.Fragment>
                                     
                                    }
                                </div>

                               
                            </div>


                    
                    </div>

                </div>

            </section>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default UserProfile;