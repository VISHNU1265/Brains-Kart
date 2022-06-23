export class AuthUtil{
    static isLoggedIn(){
        if(localStorage.getItem(process.env.REACT_APP_FEATURE_KEY)) {
            return true;
        }
        else{
            return false;
        }
    }

    static getToken(){
        return localStorage.getItem(process.env.REACT_APP_FEATURE_KEY)
    }
}
