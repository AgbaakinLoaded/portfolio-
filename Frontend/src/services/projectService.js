import api from "./api";


// Get projects

export async function getProjects(){

    const response = await api.get("/projects");

    return response.data;

}


// Create project

export async function createProject(formData){

    const response = await api.post(
        "/projects",
        formData
    );

    return response.data;

}


// Update project

export async function updateProject(id, formData){

    const response = await api.put(
        `/projects/${id}`,
        formData
    );

    return response.data;

}


// Delete project

export async function deleteProject(id){

    const response = await api.delete(
        `/projects/${id}`
    );

    return response.data;

}