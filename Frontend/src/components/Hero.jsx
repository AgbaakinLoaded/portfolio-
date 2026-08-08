import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {

    return (

        <motion.section

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

            className="
            min-h-[85vh]
            flex
            items-center
            bg-white
            "

        >

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="max-w-4xl">


                    {/* Intro */}

                    <p className="
                        text-blue-600
                        font-semibold
                        tracking-wide
                        uppercase
                        text-sm
                        mb-5
                    ">

                        Data Analyst & Frontend Developer

                    </p>



                    {/* Main Heading */}

                    <h1 className="
                        text-5xl
                        md:text-7xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        leading-tight
                    ">

                        Turning data into
                        <span className="text-blue-600">
                            {" "}insights
                        </span>
                        {" "}and ideas into
                        <span className="text-blue-600">
                            {" "}digital experiences.
                        </span>

                    </h1>



                    {/* Description */}

                    <p className="
                        text-lg
                        md:text-xl
                        text-slate-600
                        leading-relaxed
                        max-w-3xl
                        mt-7
                    ">

                        I am Akinsola, a Computer Science graduate
                        focused on data analytics and modern web
                        development. I use tools such as Excel, SQL,
                        Power BI, React and JavaScript to analyse
                        problems, uncover insights and build practical
                        digital solutions.

                    </p>



                    {/* Buttons */}

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                        mt-9
                    ">


                        <Link
                            to="/projects"
                            className="
                            inline-flex
                            items-center
                            justify-center
                            bg-blue-600
                            text-white
                            px-7
                            py-3.5
                            rounded-lg
                            font-semibold
                            hover:bg-blue-700
                            transition
                            shadow-sm
                            "
                        >

                            View My Projects

                        </Link>



                        <a
                            href="/CV.pdf"
                            download
                            className="
                            inline-flex
                            items-center
                            justify-center
                            bg-slate-900
                            text-white
                            border
                            border-slate-900
                            px-7
                            py-3.5
                            rounded-lg
                            font-semibold
                            hover:bg-slate-700
                            transition
                            shadow-sm
                            "
                        >

                            Download CV

                        </a>


                    </div>



                    {/* Social Links */}

                    <div className="
                        flex
                        gap-6
                        mt-8
                    ">

                        <a
                            href="#"
                            className="
                            text-slate-500
                            font-medium
                            hover:text-blue-600
                            transition
                            "
                        >
                            GitHub
                        </a>


                        <a
                            href="#"
                            className="
                            text-slate-500
                            font-medium
                            hover:text-blue-600
                            transition
                            "
                        >
                            LinkedIn
                        </a>

                    </div>


                </div>

            </div>

        </motion.section>

    );
}

export default Hero;