import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
const axiosSecure = useAxiosSecure()

const { data: users = null, isLoading, refetch } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
        const { data } = await axiosSecure('/user-info');
        return data
    }
})
return {users, isLoading, refetch}
};

export default useUser;