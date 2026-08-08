import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectList from "../components/admin/ProjectList";

function Admin() {

    const [editingProject, setEditingProject] = useState(null);

    const [refresh, setRefresh] = useState(false);

    function refreshProjects() {

        setRefresh(!refresh);

    }

    return (

        <div className="flex min-h-screen">

            <Sidebar />

            <main className="flex-1 p-10 bg-gray-100">

                <h1 className="text-4xl font-bold mb-8">

                    Dashboard

                </h1>

                <ProjectForm
                    editingProject={editingProject}
                    setEditingProject={setEditingProject}
                    refreshProjects={refreshProjects}
                />

                <ProjectList
                    setEditingProject={setEditingProject}
                    refresh={refresh}
                    refreshProjects={refreshProjects}
                />

            </main>

        </div>

    );

}

export default Admin;