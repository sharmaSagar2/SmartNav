import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserDataContext from "../context/UserDataContext";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:3000/users/login', userData);
            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token)
                navigate('/home');
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-14 mb-8 rounded-md"
                    src="/src/images/logo.jpg" 
                    alt="Logo"
                />
                <form onSubmit={submitHandler}>
                    <h3 className="text-xl mb-2">What is your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-200 mb-7 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        placeholder="Email"
                    />
                    <h3 className="text-xl mb-2">What is your password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-200 mb-7 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        className="bg-black text-white font-semibold mb-7 rounded-md px-4 py-2 w-full text-lg placeholder:text-base"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mb-3">
                    New here? <Link to="/signup" className="text-blue-700">Create new Account</Link>
                </p>
            </div>
            <div>
                <Link
                    to="/captain-login"
                    className="bg-green-500 flex items-center justify-center text-white font-semibold mb-4 rounded-md px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
