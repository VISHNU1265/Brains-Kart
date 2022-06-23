import axios from "axios";
import {AuthUtil} from "./AuthUtil";
export class TokenUtil {
    static setTokenHeader(token){
        if(AuthUtil.isLoggedIn()){
            axios.defaults.headers.common['x-auth-token']=token;
        }
        else{
            delete axios.defaults.headers.common['x-auth-token'];
        }
    }
}
