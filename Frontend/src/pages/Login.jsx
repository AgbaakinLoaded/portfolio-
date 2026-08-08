import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();


    async function handleLogin(e){

        e.preventDefault();


        try{

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );


            localStorage.setItem(
                "token",
                response.data.token
            );


            toast.success("Welcome back! 👋");


            navigate("/admin");


        }catch(error){

            console.log(error);

            toast.error("Invalid email or password");

        }

    }



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">


            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Admin Login
                </h1>


                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    className="w-full border p-3 rounded mb-4"

                />



                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    className="w-full border p-3 rounded mb-6"

                />


                <button

                    className="w-full bg-blue-600 text-white py-3 rounded"

                >

                    Login

                </button>


            </form>


        </div>

    )

}


export default Login;