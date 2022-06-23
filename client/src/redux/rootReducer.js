import {combineReducers} from "redux";
import * as UserReducer from "../redux/users/user.reducer"
import * as AlertReducer from "../redux/alert/alert.reducer"
import * as ProductReducer from "../redux/products/product.reducer"
import * as OrderReducer from "../redux/orders/order.reducer";

let rootReducer = combineReducers({
    register:UserReducer.reducer,
    alert:AlertReducer.reducer,
    product:ProductReducer.reducer,
    orders:OrderReducer.reducer
});

export default rootReducer;
