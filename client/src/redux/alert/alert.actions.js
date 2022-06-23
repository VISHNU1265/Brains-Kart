import {v4} from 'uuid';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const setAlert = (message,color)=>{
    let id = v4();
    return (dispatch)=>{
        dispatch({type:SET_ALERT,payload:{id,message,color}});
        setTimeout(()=>{
            dispatch(removeAlert(id));
        },2000);
    }
}

export const removeAlert = (id)=>{
    return (dispatch)=>{
        dispatch({type:REMOVE_ALERT,payload:{id}});
    }
}