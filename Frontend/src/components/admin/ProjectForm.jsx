import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import {
  createProject,
  updateProject,
} from "../../services/projectService";


function ProjectForm({
  editingProject,
  setEditingProject,
  refreshProjects,
}) {


  const [project, setProject] = useState({

    title: "",
    category: "",
    description: "",
    overview: "",
    image: null,
    demo: "",
    technologies: "",
    github: "",

  });



  useEffect(() => {

    if (!editingProject) return;


    setProject({

      title: editingProject.title || "",

      category: editingProject.category || "",

      description: editingProject.description || "",

      overview: editingProject.overview || "",

      image: editingProject.image || null,

      demo: editingProject.demo || "",

      technologies: editingProject.tools
        ? editingProject.tools.join(", ")
        : "",

      github: editingProject.github || "",

    });


  }, [editingProject]);





  function handleChange(e) {

    setProject({

      ...project,

      [e.target.name]: e.target.value,

    });

  }





  function handleImageUpload(e) {

    const file = e.target.files[0];


    if (!file) return;


    setProject({

      ...project,

      image: file,

    });

  }






  async function handleSubmit(e) {

    e.preventDefault();


    try {


      const formData = new FormData();


      formData.append(
        "title",
        project.title
      );


      formData.append(
        "slug",
        project.title
          .toLowerCase()
          .replaceAll(" ", "-")
      );


      formData.append(
        "category",
        project.category
      );


      formData.append(
        "description",
        project.description
      );


      formData.append(
        "overview",
        project.overview
      );


      formData.append(
        "demo",
        project.demo
      );


      formData.append(
        "github",
        project.github
      );


      formData.append(
        "tools",
        JSON.stringify(

          project.technologies
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)

        )
      );



      if(project.image instanceof File){

        formData.append(
          "image",
          project.image
        );

      }





      if(editingProject){


        await updateProject(

          editingProject.id,

          formData

        );


        toast.success("Project created successfully 🚀");


      }else{


        await createProject(

          formData

        );


        toast.success("Project updated successfully 🚀");


      }






      setProject({

        title:"",
        category:"",
        description:"",
        overview:"",
        image:null,
        demo:"",
        technologies:"",
        github:"",

      });



      setEditingProject(null);


      refreshProjects();




    } catch(error){


      console.log(error);


      toast.error("Failed to save project");


    }


  }







  return (

    <div className="bg-white p-8 rounded-xl shadow-md">


      <h2 className="text-2xl font-bold mb-6">

        {
          editingProject
          ? "Edit Project"
          : "Add New Project"
        }

      </h2>





      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >



        <input

          type="text"

          name="title"

          value={project.title}

          onChange={handleChange}

          placeholder="Project Title"

          className="w-full border rounded-lg px-4 py-3"

        />





        <input

          type="text"

          name="category"

          value={project.category}

          onChange={handleChange}

          placeholder="Project Category"

          className="w-full border rounded-lg px-4 py-3"

        />





        <textarea

          name="description"

          value={project.description}

          onChange={handleChange}

          placeholder="Short Description"

          className="w-full border rounded-lg px-4 py-3"

        />





        <textarea

          name="overview"

          value={project.overview}

          onChange={handleChange}

          placeholder="Full Project Explanation"

          rows="8"

          className="w-full border rounded-lg px-4 py-3"

        />





        <div>


          <label className="block mb-2">

            Project Screenshot

          </label>


          <input

            type="file"

            accept="image/*"

            onChange={handleImageUpload}

            className="w-full border rounded-lg px-4 py-3"

          />



          {project.image && (

            <img

              src={
                project.image instanceof File
                ? URL.createObjectURL(project.image)
                : `${import.meta.env.VITE_API_URL}${project.image}`
              }

              alt="preview"

              className="mt-4 w-64 rounded-lg"

            />

          )}



        </div>





        <input

          type="url"

          name="demo"

          value={project.demo}

          onChange={handleChange}

          placeholder="Demo Link"

          className="w-full border rounded-lg px-4 py-3"

        />





        <input

          type="text"

          name="technologies"

          value={project.technologies}

          onChange={handleChange}

          placeholder="Technologies"

          className="w-full border rounded-lg px-4 py-3"

        />





        <input

          type="url"

          name="github"

          value={project.github}

          onChange={handleChange}

          placeholder="Github Link"

          className="w-full border rounded-lg px-4 py-3"

        />





        <button

          type="submit"

          className="bg-blue-600 text-white px-6 py-3 rounded-lg"

        >

          {
            editingProject
            ? "Update Project"
            : "Save Project"
          }

        </button>



      </form>


    </div>

  );


}


export default ProjectForm;