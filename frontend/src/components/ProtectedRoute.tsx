import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { PrivateRouteProps } from "../utils/types";

const PrivateRoute:React.FC<PrivateRouteProps> = ({children})=>{
    const isAuthenticated = useAuthStore((state)=>state.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to={"/login"} replace/>
}

export default PrivateRoute;