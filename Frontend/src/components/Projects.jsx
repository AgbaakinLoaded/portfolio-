import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";

function Projects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        async function fetchProjects() {

            try {

                const data = await getProjects();

                setProjects(data);

            } catch (error) {

                console.log(
                    "Error fetching projects:",
                    error
                );

            }

        }

        fetchProjects();

    }, []);


    // Only show 3 projects on homepage
    const featuredProjects = projects.slice(0, 3);


    return (

        <section className="py-20 bg-gray-100">

            <div className="max-w-7xl mx-auto px-6">


                <SectionTitle
                    title="Featured Projects"
                    subtitle="A collection of data analytics and software development projects."
                />



                {/* Project Cards */}

                <div className="grid md:grid-cols-3 gap-8">


                    {featuredProjects.map((project) => (

                        <motion.div

                            key={project.id}

                            initial={{
                                opacity: 0,
                                y: 50
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}

                            transition={{
                                duration: 0.5
                            }}

                            viewport={{
                                once: true
                            }}

                            className="
                            bg-white
                            rounded-xl
                            shadow-md
                            overflow-hidden
                            hover:shadow-xl
                            transition
                            "

                        >


                            {/* Project Image */}

                            <div className="h-48 overflow-hidden">

                                <img

                                    src={
                                        project.image
                                        ? `${import.meta.env.VITE_API_URL}${project.image}`
                                        : "https://placehold.co/600x400?text=No+Image"
                                    }

                                    alt={project.title}

                                    className="
                                    w-full
                                    h-full
                                    object-cover
                                    hover:scale-105
                                    transition
                                    duration-300
                                    "

                                />

                            </div>




                            {/* Project Content */}

                            <div className="p-6">


                                <h3 className="
                                    text-xl
                                    font-bold
                                    mb-3
                                    text-slate-900
                                ">

                                    {project.title}

                                </h3>



                                <p className="
                                    text-gray-600
                                    mb-5
                                ">

                                    {project.description}

                                </p>




                                {/* Tools */}

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-2
                                    mb-6
                                ">


                                    {project.tools.map(
                                        (tool, index) => (

                                            <span

                                                key={index}

                                                className="
                                                bg-blue-100
                                                text-blue-700
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                "

                                            >

                                                {tool}

                                            </span>

                                        )
                                    )}

                                </div>




                                {/* Links */}

                                <div className="
                                    flex
                                    gap-4
                                    items-center
                                    flex-wrap
                                ">


                                    {project.demo && (

                                        <a

                                            href={project.demo}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="
                                            text-green-600
                                            font-semibold
                                            hover:text-green-700
                                            "

                                        >

                                            Live Demo

                                        </a>

                                    )}




                                    {project.github && (

                                        <a

                                            href={project.github}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="
                                            text-blue-600
                                            font-semibold
                                            hover:text-blue-700
                                            "

                                        >

                                            GitHub

                                        </a>

                                    )}




                                    <Link

                                        to={`/projects/${project.slug}`}

                                        className="
                                        bg-blue-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        hover:bg-blue-700
                                        transition
                                        "

                                    >

                                        View Project

                                    </Link>


                                </div>


                            </div>


                        </motion.div>

                    ))}


                </div>




                {/* View All Projects */}

                {projects.length > 3 && (

                    <div className="flex justify-center mt-12">

                        <Link

                            to="/projects"

                            className="
                            inline-flex
                            items-center
                            bg-slate-900
                            text-white
                            px-7
                            py-3
                            rounded-lg
                            font-semibold
                            hover:bg-slate-700
                            transition
                            "

                        >

                            View All Projects →

                        </Link>

                    </div>

                )}


            </div>


        </section>

    );

}


export default Projects;