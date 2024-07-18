
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect } from "react";

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user, refetch } = useUser();

    useEffect(() => {
        if (!user) {
            refetch();
        }
    }, [user, refetch]);

    const handleLogout = async () => {
        try {
            await axiosSecure.post('/logout');
            logout();
            navigate('/')
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            {
                user && <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            }

            <div className="flex flex-col items-center mt-5 border">
                <h1>{user?.userName}</h1>
                <h1>{user?.userEmail}</h1>
                <h1>{user?.userPhoneNum}</h1>
                <h1>{user?.userRole}</h1>
                <h1>{user?.userStatus}</h1>
            </div>           
        </div>
    );
};

export default Home;