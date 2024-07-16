import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from '../../src/assets/Logo.png'


const Register = () => {
    const [error, setError] = useState('');
    const [displayPass, setDisplayPass] = useState(false);
    const [displayConfirmPass, setDisplayConfirmPass] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phoneNum = e.target.phoneNum.value;
        const role = e.target.role.value
        const password = e.target.password.value;
        const conirmPass = e.target.conirmPass.value;
        console.log(name, email, phoneNum, role, password, conirmPass);
        setError("")

        if (!/[0-9]/.test(password)) {
            setError("your PIN should be number")
            return
        }
        else if (password.length < 6) {
            setError('Your PIN must be 6 character')
            return
        }
        else if (password !== conirmPass) {
            setError("password and confirm password didn't match")
            return
        }

    }



    return (
        <div className="bg-[#004aad] min-h-screen flex justify-center items-center">
            <Helmet>
                <title>Dune || Register</title>
            </Helmet>
            <div className="w-[25vw] bg-[#38B6FF] rounded-xl">
                <form onSubmit={handleRegister} className="px-5 py-3">

                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name *</span>
                        </label>
                        <input type="text" name="name" placeholder="Your name" className="input input-bordered" required />
                    </div>

                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email *</span>
                        </label>
                        <input type="email" name="email" placeholder="Your email" className="input input-bordered" required />
                    </div>

                    {/* phone number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mobile Number *</span>
                        </label>
                        <input type="number" name="phoneNum" placeholder="Mobile number" className="input input-bordered" required />
                    </div>

                    {/* role */}
                    <div className="flex justify-center items-center mt-4">
                        <label className="label">
                            <span>Select Role</span>
                        </label>
                        <select name="role" id="role" className="outline-none">
                            <option value="">Select Role</option>
                            <option value="User">User</option>
                            <option value="Agent">Agent</option>
                        </select>
                    </div>

                    {/* password */}
                    <div className="relative form-control">
                        <label className="label">
                            <span className="label-text">PIN *</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="PIN" className="input input-bordered" maxLength='6' required />
                        <span onClick={() => setShowPassword(!showPassword)} className='text-xl absolute right-2 top-12'>
                            {showPassword ? <IoEyeOff></IoEyeOff> : <IoEye></IoEye>}
                        </span>
                    </div>

                    {/* confirm password */}
                    <div className="relative form-control">
                        <label className="label">
                            <span className="label-text">Confirm PIN *</span>
                        </label>
                        <input type={confirmPassword ? "text" : "password"} name="conirmPass" placeholder="confirm PIN" className="input input-bordered" maxLength='6' required />
                        <span onClick={() => setConfirmPassword(!confirmPassword)} className='text-xl absolute right-2 top-12'>
                            {confirmPassword ? <IoEyeOff></IoEyeOff> : <IoEye></IoEye>}
                        </span>
                    </div>
                    <div>
                        {
                            error && <span className="text-red-600">{error}</span>
                        }
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;