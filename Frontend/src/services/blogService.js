import api from "./api";


// Get all blogs

export async function getBlogs(){

    const response = await api.get(
        "/blogs"
    );

    return response.data;

}




// Get single blog

export async function getBlogBySlug(slug){

    const response = await api.get(
        `/blogs/${slug}`
    );

    return response.data;

}





// Create blog

export async function createBlog(data){

    const response = await api.post(
        "/blogs",
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );


    return response.data;

}






// Update blog

export async function updateBlog(id,data){

    const response = await api.put(
        `/blogs/${id}`,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );


    return response.data;

}






// Delete blog

export async function deleteBlog(id){

    const response = await api.delete(
        `/blogs/${id}`
    );


    return response.data;

}