import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getProjects,
  deleteProject as deleteProjectAPI,
} from "../../services/projectService";



function ProjectList({
  setEditingProject,
  refreshTrigger
}) {


  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");




  async function loadProjects() {

    try {

      setLoading(true);

      setError("");


      const data = await getProjects();


      setProjects(data);



    } catch (error) {


      console.log(error);


      setError(
        "Failed to load projects"
      );



    } finally {


      setLoading(false);


    }

  }





  useEffect(() => {

    loadProjects();

  }, [refreshTrigger]);







  async function handleDelete(id) {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );



    if (!confirmDelete) return;



    try {


      await deleteProjectAPI(id);



      setProjects(
        projects.filter(
          (project) => project.id !== id
        )
      );



      toast.success(
        "Project deleted successfully "
        );



    } catch (error) {


      console.log(error);


      toast.error(
        "Failed to delete project"
      );


    }

  }






  if (loading) {


    return (

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Saved Projects
        </h2>


        <p className="text-gray-500">
          Loading projects...
        </p>


      </div>

    );


  }






  if (error) {


    return (

      <div className="mt-10">


        <h2 className="text-2xl font-bold mb-6">
          Saved Projects
        </h2>


        <p className="text-red-600">
          {error}
        </p>


      </div>

    );


  }







  return (

    <div className="mt-10">


      <h2 className="text-2xl font-bold mb-6">
        Saved Projects
      </h2>




      {projects.length === 0 && (

        <p className="text-gray-500">
          No projects available
        </p>

      )}






      <div className="space-y-5">



        {projects.map((project) => (


          <div

            key={project.id}

            className="bg-white p-6 rounded-xl shadow flex justify-between items-center"

          >



            <div>


              <h3 className="text-xl font-bold">
                {project.title}
              </h3>



              <p className="text-gray-600">
                {project.category}
              </p>



            </div>







            <div className="flex gap-3">



              <button

                onClick={() =>
                  setEditingProject(project)
                }

                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"

              >

                Edit

              </button>







              <button

                onClick={() =>
                  handleDelete(project.id)
                }

                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

              >

                Delete

              </button>




            </div>





          </div>



        ))}



      </div>



    </div>

  );


}


export default ProjectList;