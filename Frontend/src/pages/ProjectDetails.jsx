import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetails() {

    const { slug } = useParams();

    const [project, setProject] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function fetchProject() {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}${project.image}`
                );


                const foundProject = response.data.find(
                    item => item.slug === slug
                );


                setProject(foundProject);


            } catch (error) {

                console.log(
                    "Project details error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }


        fetchProject();

    }, [slug]);



    if (loading) {

        return (

            <section className="py-20">

                <h1 className="text-center text-3xl font-bold">

                    Loading project...

                </h1>

            </section>

        );

    }



    if (!project) {

        return (

            <section className="py-20">

                <h1 className="text-center text-3xl font-bold">

                    Project Not Found

                </h1>

            </section>

        );

    }



    return (

        <section className="py-20 bg-gray-50">

            <div className="max-w-5xl mx-auto px-6">


                {/* Project Title */}

                <h1 className="
                    text-4xl
                    md:text-5xl
                    font-bold
                    text-slate-900
                    mb-8
                ">

                    {project.title}

                </h1>



                {/* Project Image */}

                {project.image && (

                    <div className="mb-10 overflow-hidden rounded-2xl">

                        <img

                            src={
                                project.image.startsWith("http")
                                    ? project.image
                                    : `${import.meta.env.VITE_API_URL}${project.image}`
                            }

                            alt={project.title}

                            className="
                                w-full
                                max-h-[600px]
                                object-cover
                            "

                        />

                    </div>

                )}



                {/* Project Description */}

                <div className="mb-10">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-slate-900
                        mb-4
                    ">

                        About the Project

                    </h2>


                    <p className="
                        text-lg
                        text-gray-600
                        leading-8
                    ">

                        {project.overview || project.description}

                    </p>

                </div>



                {/* Technologies */}

                <div className="mb-10">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-slate-900
                        mb-4
                    ">

                        Technologies

                    </h2>


                    <div className="flex flex-wrap gap-3">

                        {project.tools?.map(
                            (tool, index) => (

                                <span

                                    key={index}

                                    className="
                                    bg-blue-100
                                    text-blue-700
                                    px-4
                                    py-2
                                    rounded-full
                                    font-medium
                                    "

                                >

                                    {tool}

                                </span>

                            )
                        )}

                    </div>

                </div>



                {/* Project Links */}

                <div className="flex gap-4 flex-wrap">


                    {project.demo && (

                        <a

                            href={project.demo}

                            target="_blank"

                            rel="noreferrer"

                            className="
                            bg-green-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            font-semibold
                            hover:bg-green-700
                            transition
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
                            bg-slate-900
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            font-semibold
                            hover:bg-slate-700
                            transition
                            "

                        >

                            GitHub

                        </a>

                    )}

                </div>


            </div>

        </section>

    );

}

export default ProjectDetails;