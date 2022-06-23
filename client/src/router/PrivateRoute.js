import {Navigate, Outlet} from "react-router-dom";
import { AuthUtil } from "../util/AuthUtil";


let PrivateRoute = ()=>{
  const auth = AuthUtil.isLoggedIn();
  console.log(auth);
  return (auth)? <Outlet/> : <Navigate to="/users/login"/>;
}

export default PrivateRoute;