import React from 'react';
import {useSelector} from "react-redux";

let Alert = (props)=>{

    let alertState = useSelector((state)=>{
        return state.alert;
    });

    let {alerts} = alertState;
    console.log(alerts);
    return (
        <React.Fragment>
            {
                alerts.length>0 && alerts.map((alert)=>{

                    return (
                        <div key={alert.id} className={`alert alert-${alert.color} alert-dismissible m-3 fixed-top animated slideInDown`}>
                            <small>{alert.message}</small>
                        <button className="btn-close" data-dismiss="alert" aria-label="Close">
                        </button>
                    </div>
                    );
                })
            }

        </React.Fragment>
    )
}

export default Alert;