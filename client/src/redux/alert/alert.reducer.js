import * as alertActions from "./alert.actions";

export const initialState = {
    alerts : []
}

export const reducer = (state=initialState,action)=>{
    let {type,payload} = action;
    switch (type){
        case alertActions.SET_ALERT:
            return {
                alerts: [
                    ...state.alerts,
                    payload
                ]
            }
        case alertActions.REMOVE_ALERT:
            let alerts = state.alerts;
            let updatedAlerts = alerts.filter(({message,id,color})=>{
                return id!==payload.id;
            });
            return {
                alerts:updatedAlerts
            }
        default:
            return state


    }
}