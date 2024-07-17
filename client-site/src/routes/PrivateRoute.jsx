import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";
import PropTypes from 'prop-types';

const PrivateRoute = ({children }) => {
    const {users, isLoading} = useUser();
// const location = useLocation();

console.log(users)
if(isLoading){
    return 
}

else if(users){
    return children
}
else{
    return <Navigate state = {location.pathname} to='/login' replace={true}></Navigate>
}

};


PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;