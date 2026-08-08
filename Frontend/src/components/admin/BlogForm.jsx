import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
    createBlog,
    updateBlog
} from "../../services/blogService";


function BlogForm({
    editingBlog,
    setEditingBlog,
    refreshBlogs
}) {


    const [blog,setBlog] = useState({

    title:"",
    slug:"",
    excerpt:"",
    content:"",
    category:"",
    tags:""

});

    const [image,setImage] = useState(null);

    const [preview,setPreview] = useState("");


    useEffect(() => {
         console.log("BlogForm received:", editingBlog);


        if(editingBlog){


            setBlog({
                title: editingBlog.title || "",

                slug: editingBlog.slug || "",

                excerpt: editingBlog.excerpt || "",

                content: editingBlog.content || "",

                category: editingBlog.category || "",

                tags: editingBlog.tags || ""
            });


        }


    }, [editingBlog]);


    function handleChange(e){


        setBlog({

            ...blog,

            [e.target.name]: e.target.value

        });


    }


    function handleImageChange(e){

    const file = e.target.files[0];


    if(file){

        setImage(file);


        setPreview(
            URL.createObjectURL(file)
        );

    }
    }


    async function handleSubmit(e){


        e.preventDefault();


        try{


            const formData = new FormData();



            formData.append(
                "title",
                blog.title
            );


            formData.append(
                "slug",
                blog.slug
            );


            formData.append(
                "excerpt",
                blog.excerpt
            );


            formData.append(
                "content",
                blog.content
            );


            if(image){

                formData.append(
                    "image",
                    image
                );

            }


            if(editingBlog){


                await updateBlog(

                    editingBlog.id,

                    formData

                );


                toast.success(
                    "Blog updated successfully 🚀"
                );


            }else{


                await createBlog(
                    formData
                );


                toast.success(
                    "Blog created successfully 🚀"
                );


            }

            setBlog({
                title:"",
                slug:"",
                excerpt:"",
                content:"",
                category:"",
                tags:""
            });



            setImage(null);
            setPreview("");


            setEditingBlog(null);


            refreshBlogs();




        }catch(error){


            console.log(error);


            toast.error(
                "Failed to save blog"
            );


        }


    }

const modules = {

    toolbar: [

        [{ header: [1, 2, 3, false] }],

        [
            "bold",
            "italic",
            "underline"
        ],

        [
            "blockquote",
            "code-block"
        ],

        [
            { list: "ordered" },
            { list: "bullet" }
        ],

        [
            "link"
        ]

    ]

};


    return (


        <form

            onSubmit={handleSubmit}

            className="bg-white p-6 rounded-xl shadow mb-10"

        >



            <h2 className="text-2xl font-bold mb-5 text-red-600">


                {editingBlog

                    ? "Edit Blog"

                    : "Create Blog"

                }


            </h2>


            <input
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Blog title"
                className="w-full border p-3 mb-4 rounded"
                required
            />

            <input


                name="slug"


                value={blog.slug}


                onChange={handleChange}


                placeholder="Slug"


                className="w-full border p-3 mb-4 rounded"


                required


            />


            <input


                name="excerpt"


                value={blog.excerpt}


                onChange={handleChange}


                placeholder="Short description"


                className="w-full border p-3 mb-4 rounded"


            />

            <input

                name="category"

                value={blog.category}

                onChange={handleChange}

                placeholder="Category e.g Frontend Development"

                className="w-full border p-3 mb-4 rounded"
            />

            <input

                name="tags"

                value={blog.tags}

                onChange={handleChange}

                placeholder="Tags e.g React, JavaScript, Tailwind"

                className="w-full border p-3 mb-4 rounded"
            />


<ReactQuill

    theme="snow"

    value={blog.content}

    onChange={(value)=>{

        setBlog({

            ...blog,

            content:value

        });

    }}

    modules={modules}

    className="mb-4 bg-white"

/>


            <div className="mb-4">


                <label className="block mb-2 font-semibold">


                    Upload Blog Image


                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border p-3 rounded"
                />
                {
                preview && (
                <img
                src={preview}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded-lg"
                />

                )
                }


            </div>


            <button


                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"


            >


                {editingBlog

                    ? "Update Blog"

                    : "Save Blog"

                }


            </button>

        </form>


    );


}


export default BlogForm;