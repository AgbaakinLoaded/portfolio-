import { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import { getDashboardStats } from "../services/dashboardService";

function AdminDashboard() {

  const [stats, setStats] = useState({

    totalProjects: 0,

    latestProject: null

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const data = await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, []);

  if (loading) {

    return (

      <div className="flex flex-col md:flex-row min-h-screen">

        <Sidebar />

        <main className="flex-1 p-10">

          <h1 className="text-4xl font-bold">
            Loading Dashboard...
          </h1>

        </main>

      </div>

    );

  }

  return (

    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 p-5 md:p-10 bg-gray-100">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-gray-500">
              Total Projects
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-3">
              {stats.totalProjects}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-gray-500">
              Latest Project
            </h2>

            <p className="text-xl font-semibold mt-3">

              {stats.latestProject
                ? stats.latestProject.title
                : "No projects"}

            </p>

          </div>

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;