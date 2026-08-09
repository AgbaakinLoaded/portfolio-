import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Projects",
            path: "/projects"
        },
        {
            name: "Blog",
            path: "/blog"
        },
        {
            name: "Contact",
            path: "/contact"
        }
    ];

    return (
        <nav className="bg-white border-b border-gray-200 text-slate-800 shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex justify-between items-center">

                    {/* Logo */}

                    {/* Logo */}

                    <Link
                    to="/"
                    className="flex items-center"
                    >
                        <img
                        src="/logo.jpg"
                        alt="Akinsola logo"
                        className="h-20 w-auto object-contain"
                        />
                    </Link>


                    {/* Desktop Menu */}

                    <div className="hidden md:flex items-center gap-8">

                        {links.map((link) => (

                            <Link
                                key={link.path}
                                to={link.path}
                                className="
                                font-medium
                                text-slate-600
                                hover:text-blue-600
                                transition
                                "
                            >
                                {link.name}
                            </Link>

                        ))}

                    </div>


                    {/* Mobile Button */}

                    <button
                        className="
                        md:hidden
                        text-slate-800
                        hover:text-blue-600
                        transition
                        "
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >

                        {open ? (
                            <X size={30} />
                        ) : (
                            <Menu size={30} />
                        )}

                    </button>

                </div>


                {/* Mobile Menu */}

                {open && (

                    <div className="
                        md:hidden
                        mt-5
                        pt-5
                        border-t
                        border-gray-200
                        flex
                        flex-col
                        gap-5
                    ">

                        {links.map((link) => (

                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setOpen(false)}
                                className="
                                font-medium
                                text-slate-700
                                hover:text-blue-600
                                transition
                                "
                            >
                                {link.name}
                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </nav>
    );
}

export default Navbar;