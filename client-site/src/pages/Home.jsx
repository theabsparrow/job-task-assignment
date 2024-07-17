
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect } from "react";


const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const {users, refetch} = useUser();

    console.log(users)
    useEffect(() => {
        if (!users) {
            refetch(); 
        }
    }, [users, refetch]);

    const handleLogout = async () => {
        try {
            await axiosSecure.post('/logout');
            logout();
            navigate('/login')
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            {
                users && <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            }

            <div className="flex flex-col items-center mt-5 border">
                <h1>{users?.userName}</h1>
                <h1>{users?.userEmail}</h1>
                <h1>{users?.userPhoneNum}</h1>
            </div>
        </div>
    );
};

export default Home;