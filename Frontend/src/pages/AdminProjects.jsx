import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectList from "../components/admin/ProjectList";

function AdminProjects() {

  const [editingProject, setEditingProject] = useState(null);

  const [refreshProjects, setRefreshProjects] = useState(false);

  function refresh() {
    setRefreshProjects(!refreshProjects);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      <Sidebar />

      <main className="flex-1 p-5 md:p-10 bg-gray-100">

        <h1 className="text-4xl font-bold mb-8">
          Project Management
        </h1>

        <ProjectForm
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          refreshProjects={refresh}
        />

        <ProjectList
          setEditingProject={setEditingProject}
          refreshTrigger={refreshProjects}
        />

      </main>

    </div>
  );
}

export default AdminProjects;