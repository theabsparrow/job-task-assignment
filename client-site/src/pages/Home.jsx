
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUser from "../hooks/useUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect } from "react";


const Home = () => {
    const {user, setUser, logout} = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const [users, isLoading, refetch] = useUser();
    
    useEffect(() => {
        if (!users) {
            refetch(); // Fetch user info on initial load
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

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="flex justify-center">
           <button onClick={handleLogout} className="btn btn-primary">Logout</button>
        </div>
    );
};

export default Home;