import React from 'react';
import spinner from "../../../../assets/img/spinner.gif";


let Spinner = (props)=>{
    return (
        <React.Fragment>
            <section className="container text-center">
                <img src={spinner} alt=""/>
            </section>
        </React.Fragment>
    )
}

export default Spinner;