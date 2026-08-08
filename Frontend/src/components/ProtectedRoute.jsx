import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { verifyAdmin } from "../services/authService";


function ProtectedRoute({ children }) {

    const [checking, setChecking] =
        useState(true);

    const [authenticated, setAuthenticated] =
        useState(false);


    useEffect(() => {

        async function checkAuthentication() {

            const token =
                localStorage.getItem("token");


            if (!token) {

                setAuthenticated(false);

                setChecking(false);

                return;

            }


            try {

                await verifyAdmin();

                setAuthenticated(true);


            } catch (error) {

                console.log(
                    "Authentication failed:",
                    error
                );


                localStorage.removeItem("token");

                setAuthenticated(false);

            } finally {

                setChecking(false);

            }

        }


        checkAuthentication();

    }, []);


    if (checking) {

        return (

            <div className="
                min-h-screen
                flex
                items-center
                justify-center
            ">

                <p className="
                    text-xl
                    font-semibold
                ">

                    Checking authentication...

                </p>

            </div>

        );

    }


    if (!authenticated) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );

    }


    return children;

}


export default ProtectedRoute;