import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserDataContext from "../context/UserDataContext";

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:3000/users/register", newUser);

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error during registration:", error.response?.data || error.message);
        } finally {
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
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
                    <h3 className="text-base font-medium mb-2">What is your name</h3>
                    <div className="flex gap-4 mb-5">
                        <input
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-gray-200 w-1/2 rounded-md px-4 py-2 border text-lg placeholder:text-base"
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-gray-200 w-1/2 rounded-md px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <h3 className="text-base font-medium mb-2">Type your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-200 mb-7 rounded-md px-4 py-2 border w-full text-base placeholder:text-sm"
                        type="email"
                        placeholder="Email"
                    />
                    <h3 className="text-base font-medium mb-2">Enter password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-200 mb-7 rounded-md px-4 py-2 border w-full text-base placeholder:text-sm"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="bg-black text-white font-semibold mb-7 rounded-md px-4 py-2 w-full text-lg placeholder:text-base"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mb-3">
                    Already have an account? <Link to="/login" className="text-blue-700">Login here</Link>
                </p>
            </div>
            <div>
                <p className="text-[10px] leading-4">
                    By proceeding, you consent to get call, WhatsApp, or SMS messages from Uber. Message and data rates may apply to messages.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
