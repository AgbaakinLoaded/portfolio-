import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();


    function logout() {

        localStorage.removeItem("token");

        navigate("/login");

    }


    return (

        <aside className="
            w-full
            md:w-64
            min-h-screen
            bg-gray-900
            text-white
            p-6
        ">


            <h1 className="
                text-2xl
                font-bold
                mb-10
            ">

                Admin Panel

            </h1>



            <nav className="
                flex
                flex-col
                gap-4
            ">


                {/* Dashboard */}

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >

                    Dashboard

                </NavLink>



                {/* Projects */}

                <NavLink
                    to="/admin/projects"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >

                    Projects

                </NavLink>



                {/* Blogs */}

                <NavLink
                    to="/admin/blogs"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >

                    Blogs

                </NavLink>



                {/* Messages */}

                <NavLink
                    to="/admin/messages"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-lg ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-gray-700"
                        }`
                    }
                >

                    Messages

                </NavLink>



                {/* Logout */}

                <button
                    onClick={logout}
                    className="
                        mt-8
                        bg-red-600
                        hover:bg-red-700
                        px-4
                        py-3
                        rounded-lg
                        text-left
                    "
                >

                    Logout

                </button>


            </nav>


        </aside>

    );

}


export default Sidebar;