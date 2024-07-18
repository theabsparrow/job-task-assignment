import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation()

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = e.target.emailOrNum.value;
        const password = e.target.password.value;
        const loginInfo = {
            userInfo: user,
            userPass: password
        }

        try {
            const { data } = await axiosPublic.post('/login', loginInfo, {withCredentials: true});
            if (data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "you have successfully regestered",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state? location.state: '/home')            
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.message
                });
            }

        }

        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="font-roboto bg-[#004aad] min-h-screen flex justify-center items-center">
            <Helmet>
                <title>Dune || Login</title>
            </Helmet>
            <div className="w-[25vw] bg-[#38B6FF] rounded-xl pb-3">
                <form onSubmit={handleLogin} className="px-5 py-3">

                    {/* user email or password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mobile number or email address *</span>
                        </label>
                        <input type="text" name="emailOrNum" placeholder="Type your mobile number or email" className="input input-bordered" required />
                    </div>

                    {/* password */}
                    <div className="relative form-control">
                        <label className="label">
                            <span className="label-text">PIN *</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="PIN" className="input input-bordered" maxLength='5' required />
                        <span onClick={() => setShowPassword(!showPassword)} className='text-xl absolute right-2 top-12'>
                            {showPassword ? <IoEyeOff></IoEyeOff> : <IoEye></IoEye>}
                        </span>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="flex justify-center">
                    <span>New to this site? <Link to='/register'>Register</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Login;