import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SectionTitle from "./ui/SectionTitle";
import { getBlogs } from "../services/blogService";


function Blog(){

    const [blogs,setBlogs] = useState([]);

    const [search,setSearch] = useState("");

    const [category,setCategory] = useState("All");

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        async function fetchBlogs(){


            try{


                const data = await getBlogs();

                setBlogs(data);


            }catch(error){


                console.log(
                    "Blog fetch error:",
                    error
                );


            }finally{


                setLoading(false);


            }


        }



        fetchBlogs();


    },[]);





    if(loading){

        return (

            <section className="py-20 text-center">

                <h1 className="text-3xl font-bold">

                    Loading blogs...

                </h1>

            </section>

        );

    }





    // Remove empty categories
    const categories = [

        "All",

        ...new Set(

            blogs

            .filter(
                blog => blog.category
            )

            .map(
                blog => blog.category
            )

        )

    ];






    const filteredBlogs = blogs.filter((blog)=>{


        const matchesSearch =

            blog.title

            .toLowerCase()

            .includes(

                search.toLowerCase()

            );





        const matchesCategory =

            category === "All" ||

            blog.category === category;





        return (

            matchesSearch &&

            matchesCategory

        );


    });







    return (


        <section className="py-20 bg-gray-100 dark:bg-gray-900">


            <div className="max-w-7xl mx-auto px-6">



                <SectionTitle

                    title="Latest Articles"

                    subtitle="My thoughts, tutorials and experiences."

                />





                {/* Search */}

                <div className="mb-6">


                    <input

                    type="text"

                    placeholder="Search articles..."

                    value={search}

                    onChange={(e)=>
                        setSearch(e.target.value)
                    }

                    className="
                    w-full
                    p-4
                    rounded-xl
                    border
                    dark:bg-gray-800
                    dark:text-white
                    "

                    />


                </div>







                {/* Categories */}

                <div className="flex flex-wrap gap-3 mb-10">


                {
                    categories.map((item)=>(


                        <button

                        key={item}

                        onClick={()=>
                            setCategory(item)
                        }

                        className={

                        `

                        px-5

                        py-2

                        rounded-full

                        font-semibold

                        ${
                            category === item

                            ?

                            "bg-blue-600 text-white"

                            :

                            "bg-gray-200 dark:bg-gray-700"

                        }

                        `

                        }


                        >

                            {item}


                        </button>


                    ))
                }


                </div>









                {/* Blog Cards */}


                <div className="grid md:grid-cols-3 gap-8">



                {
                    filteredBlogs.map((blog)=>(


                        <article

                        key={blog.id}

                        className="
                        bg-white
                        dark:bg-gray-800
                        rounded-2xl
                        shadow-md
                        overflow-hidden
                        hover:shadow-xl
                        transition
                        duration-300
                        "

                        >




                        {
                            blog.image && (


                                <img


                                src={
                                    `http://localhost:5000${blog.image}`
                                }


                                alt={blog.title}


                                className="
                                w-full
                                h-56
                                object-cover
                                "


                                />


                            )
                        }








                        <div className="p-6">






                        {
                            blog.category && (


                                <span


                                className="
                                inline-block
                                bg-blue-100
                                dark:bg-blue-900
                                text-blue-700
                                dark:text-blue-300
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-semibold
                                mb-4
                                "


                                >

                                    {blog.category}


                                </span>


                            )
                        }









                        <h2


                        className="
                        text-2xl
                        font-bold
                        mb-3
                        dark:text-white
                        "


                        >


                            {blog.title}


                        </h2>









                        <p


                        className="
                        text-gray-600
                        dark:text-gray-300
                        mb-5
                        line-clamp-3
                        "


                        >


                            {blog.excerpt}


                        </p>









                        {
                            blog.tags && (


                                <div className="flex flex-wrap gap-2 mb-5">


                                {

                                    blog.tags

                                    .split(",")

                                    .map((tag,index)=>(


                                        <span


                                        key={index}


                                        className="
                                        bg-gray-100
                                        dark:bg-gray-700
                                        text-gray-700
                                        dark:text-gray-200
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        "


                                        >

                                            #{tag.trim()}


                                        </span>


                                    ))

                                }


                                </div>


                            )
                        }









                        <Link


                        to={`/blog/${blog.slug}`}


                        className="
                        text-blue-600
                        font-semibold
                        hover:underline
                        "


                        >

                            Read Article →

                        </Link>





                        </div>





                        </article>


                    ))
                }



                </div>




            </div>



        </section>


    );


}


export default Blog;