import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";
import PropTypes from 'prop-types';

const PrivateRoute = ({children }) => {
    const {user, isLoading} = useUser();
const location = useLocation();

if(isLoading){
    return 
}

else if(user){
    return children
}
else{
    return <Navigate state = {location.pathname} to='/' replace={true}></Navigate>
}

};


PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;