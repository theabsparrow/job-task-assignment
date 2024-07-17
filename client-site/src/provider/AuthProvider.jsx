import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loader, setLoader] = useState(true);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const { data } = await axiosPublic.get('/user-info', { withCredentials: true });
    //             setUser(data);
    //         } catch (error) {
    //             console.error('Error fetching user info:', error);
    //         }
    //     };
    //     fetchUserInfo();
    // }, [axiosPublic]);


    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const logout = async () => {
        try {
            await axiosSecure.post('/logout');
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const authInfo = {
        user,
        setUser,
        loader,
        setLoader,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;