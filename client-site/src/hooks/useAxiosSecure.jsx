import axios from "axios";


const useAxiosSecure = () => {

    const axiossecure = axios.create({
        baseURL:import.meta.env.VITE_API_URL,
        withCredentials: true,
    })
    return axiossecure
};

export default useAxiosSecure;