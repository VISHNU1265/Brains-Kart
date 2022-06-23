import React from 'react';
import {NavLink} from "react-router-dom";
import brandImg from "../../../../assets/img/brand.png";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as ProductActions from "../../../../redux/products/product.actions"
import {AuthUtil} from "../../../../util/AuthUtil";
import {useEffect} from "react";


let UploadProduct = (props)=>{
    let  dispatcher = useDispatch();
    let navigate = useNavigate();

    let userState = useSelector((state)=>{
        return state.register;
    });

    let {user} = userState;

    useEffect(()=>{
        function util(){
            if(AuthUtil.isLoggedIn()===false){
                navigate("/users/login")
            }
        }
        util();
    },[user])


    
    let [productState,setProductState] = useState({
        product:{
            name:"",
            brand:"",
            price:0,
            qty:0,
            category:"",
            image:"",
            description:"",
            usage:""
        }
    });

    let updateInput = (event)=>{
        setProductState({
            ...productState,
            product:{
                ...productState.product,
                [event.target.name]:event.target.value
            }
        })
    }

    let convertBase64String =  (imageFile)=>{
           return new Promise((resolve,reject)=>{
               let fileReader = new FileReader();
               fileReader.readAsDataURL(imageFile);
               fileReader.addEventListener('load',()=>{
                   if(fileReader.result){
                       resolve(fileReader.result);
                   }
                   else{
                       reject('Error Occurred');
                   }
               });
           });
            
        }

    let updateImage = async (event)=>{
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile);
        setProductState({
            ...productState,
            product:{
                ...productState.product,
                image:base64Image.toString()
            }
        });


    }

    let submitProductUpload = (event)=>{
        event.preventDefault();
        dispatcher(ProductActions.uploadProduct(product,navigate));

    }

    let {product} = productState;

    return (
        <React.Fragment>

            <section className="bg-brown tex-black p-3">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex align-items-center">
                            <h3 className="font-weight-bold ">
                               Upload Products
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                (user && user.isAdmin)?<section className="container mt-3 mb-5">
                <div className="row">
                    <div className="col">
                        <div className="card">

                            <div className="card-body bg-form-light">
                                <form onSubmit={submitProductUpload.bind(this)}>
                                    <div className="form-group mt-3">
                                        <input
                                            name ="name" required onChange={updateInput.bind(this)}
                                            value = {product.name}
                                            type="text" className='form-control' placeholder="Name"/>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            name ="brand" required onChange={updateInput.bind(this)}
                                            value={product.brand}
                                            type="text" className='form-control' placeholder="Brand"/>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input name ="price" required onChange={updateInput.bind(this)}
                                               value={product.price}
                                               type="number" className='form-control' placeholder="Price"/>
                                    </div>
                                    <div className="form-group mt-3">

                                        <input name ="qty" required onChange={updateInput.bind(this)}
                                               value={product.qty}
                                               type="number" className='form-control' placeholder="Qty"/>
                                    </div>
                                    <div className="form-group mt-3">
                                        <select name ="category" required onChange={updateInput.bind(this)}
                                                value={product.category}
                                                className="form-control">
                                            <option value="">Select a Category</option>
                                            <option value="MEN">Men's Collection</option>
                                            <option value="WOMEN">Women's Collection</option>
                                            <option value="KIDS">Kid's Collection</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="file"
                                               required
                                               name="image"
                                               onChange={updateImage.bind(this)} className='form-control' placeholder="Image"/>
                                        {
                                            product.image?.length>0 && <img src={product.image} width="20" height="25" alt=""/>
                                        }
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea name ="description" required onChange={updateInput.bind(this)}
                                                  value={product.description}
                                                  rows={3} className='form-control' placeholder="Description"/>
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea name ="usage" required onChange={updateInput.bind(this)}
                                                  value={product.usage}
                                                  rows={3} className='form-control' placeholder="Usage"/>
                                    </div>
                                    <div className="mt-2 form-group">
                                        <input type="submit" className="btn btn-dark  text-brown" value="Upload"/>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>:
                <React.Fragment>
                    <section className='mt-3 container'>
                        <div className='text-center'>
                            <h3 className='text-danger'>Hey {user.name} !! You are not Authorized to Upload any Product!!</h3>
                            <small>
                                NOTE : If you really wants to upload products,<br/>
                                Please contact the admin to grant access
                            </small>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default UploadProduct;