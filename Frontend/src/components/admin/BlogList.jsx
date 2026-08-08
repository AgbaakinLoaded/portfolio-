import { useEffect,useState } from "react";
import toast from "react-hot-toast";

import {
    getBlogs,
    deleteBlog
} from "../../services/blogService";



function BlogList({

    setEditingBlog,

    refreshTrigger

}){


    const [blogs,setBlogs] = useState([]);



    useEffect(()=>{

        loadBlogs();

    },[refreshTrigger]);





    async function loadBlogs(){


        try{


            const data = await getBlogs();


            setBlogs(data);


        }catch(error){


            console.log(error);


        }


    }






    async function handleDelete(id){


        const confirmDelete =
            window.confirm(
                "Delete this blog?"
            );



        if(!confirmDelete)
            return;



        try{


            await deleteBlog(id);



            setBlogs(

                blogs.filter(
                    blog=>blog.id !== id
                )

            );


            toast.success(
                "Blog deleted successfully"
            );



        }catch(error){


            toast.error(
                "Delete failed"
            );


        }


    }






    return (

        <div>


            <h2 className="text-2xl font-bold mb-5">

                Blogs

            </h2>




            {

            blogs.map(blog=>(


                <div

                key={blog.id}

                className="bg-white p-5 rounded-xl shadow mb-4 flex justify-between"

                >


                    <div>

                        <h3 className="text-xl font-bold">

                            {blog.title}

                        </h3>


                        <p>

                            {blog.excerpt}

                        </p>


                    </div>





                    <div className="flex gap-3">


                       <button
                       onClick={() => {
                        console.log("Edit clicked");
                        console.log(blog);

                        setEditingBlog(blog);
                            }}
                            >
                            Edit
                        </button>





                        <button

                        onClick={()=>
                            handleDelete(blog.id)
                        }

                        className="bg-red-600 text-white px-4 rounded"

                        >

                            Delete

                        </button>


                    </div>


                </div>


            ))

            }


        </div>

    );


}


export default BlogList;