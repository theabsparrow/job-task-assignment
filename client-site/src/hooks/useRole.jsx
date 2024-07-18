import { useEffect, useState } from "react";
import useUser from "./useUser";


const useRole = () => {
    const { user, isLoading, refetch } = useUser();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user) {
            setRole(user?.userRole);
        }
    }, [user]);
    return { role, isLoading, refetch };
};

export default useRole;