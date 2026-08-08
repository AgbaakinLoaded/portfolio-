import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBlogs } from "../services/blogService";


function LatestBlogs(){

    const [blogs,setBlogs] = useState([]);


    useEffect(()=>{


        async function fetchBlogs(){


            try{


                const data = await getBlogs();


                setBlogs(
                    data.slice(0,3)
                );


            }catch(error){

                console.log(error);

            }


        }


        fetchBlogs();


    },[]);



    return (

        <section className="py-20 bg-gray-100 dark:bg-gray-900">


            <div className="max-w-7xl mx-auto px-6">


                <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">

                    Latest Articles

                </h2>



                <div className="grid md:grid-cols-3 gap-8">


                {
                    blogs.map((blog)=>(


                        <article

                        key={blog.id}

                        className="
                        bg-white
                        dark:bg-gray-800
                        rounded-xl
                        shadow
                        overflow-hidden
                        "

                        >


                        {
                            blog.image && (

                                <img

                                src={`${import.meta.env.VITE_API_URL}${blog.image}`}

                                alt={blog.title}

                                className="
                                w-full
                                h-48
                                object-cover
                                "

                                />

                            )
                        }



                        <div className="p-5">


                            <p className="text-blue-600 font-semibold mb-2">

                                {blog.category}

                            </p>



                            <h3 className="text-xl font-bold dark:text-white mb-3">

                                {blog.title}

                            </h3>



                            <p className="text-gray-600 dark:text-gray-300">

                                {blog.excerpt}

                            </p>


                            <Link

                            to={`/blog/${blog.slug}`}

                            className="
                            inline-block
                            mt-4
                            text-blue-600
                            font-semibold
                            "

                            >

                            Read More →

                            </Link>



                        </div>


                        </article>


                    ))
                }


                </div>



                <div className="text-center mt-10">


                    <Link

                    to="/blog"

                    className="
                    bg-blue-600
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    "

                    >

                    View All Articles

                    </Link>


                </div>



            </div>


        </section>

    )

}


export default LatestBlogs;