import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";

import BlogForm from "../components/admin/BlogForm";
import BlogList from "../components/admin/BlogList";


function AdminBlogs(){

    const [
        editingBlog,
        setEditingBlog
    ] = useState(null);


    const [
        refreshBlogs,
        setRefreshBlogs
    ] = useState(false);



    function refresh(){

        setRefreshBlogs(
            !refreshBlogs
        );

    }



    return (

        <div className="flex flex-col md:flex-row min-h-screen">


            <Sidebar />


            <main className="flex-1 p-5 md:p-10 bg-gray-100">


                <h1 className="text-4xl font-bold mb-8">

                    Blog Management

                </h1>



                <BlogForm

                    editingBlog={editingBlog}

                    setEditingBlog={setEditingBlog}

                    refreshBlogs={refresh}

                />



                <BlogList

                    setEditingBlog={setEditingBlog}

                    refreshTrigger={refreshBlogs}

                />



            </main>



        </div>

    );


}


export default AdminBlogs;