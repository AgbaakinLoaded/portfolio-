import api from "./api";

export async function getDashboardStats() {

    const projects = await api.get("/projects");

    return {

        totalProjects: projects.data.length,

        latestProject:
            projects.data.length > 0
                ? projects.data[0]
                : null

    };

}