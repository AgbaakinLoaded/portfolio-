function Skills() {


  const skillGroups = [

    {
      title: "Data Analytics",

      skills: [
        "Microsoft Excel",
        "SQL",
        "Power BI",
        "Python",
        "Data Cleaning and Preparation",
        "Data Visualisation",
        "Dashboard Development",
        "KPI & Performance Analysis",
        "Exploratory Data Analysis"
      ]
    },


     
      // title: "Frontend Development",

      

    {
      title: "Backend & Database",

      skills: [
        "PostgreSQL",
        "MySQL",
        "Database Design",
        
      ]
    },


    {
      title: "Tools & Workflow",

      skills: [
        "Git",
        "GitHub",
        "VS Code",
        
        
      ]
    }

  ];



  return (

    <section className="py-20 bg-gray-100">


      <div className="max-w-7xl mx-auto px-6">


        <h2 className="text-4xl font-bold text-center mb-12">
          Skills & Technologies
        </h2>



        <div className="grid md:grid-cols-2 gap-8">


          {skillGroups.map((group,index)=>(


            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md"
            >


              <h3 className="text-2xl font-bold mb-5">
                {group.title}
              </h3>



              <div className="flex flex-wrap gap-3">


                {group.skills.map((skill,i)=>(


                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>


                ))}


              </div>


            </div>


          ))}


        </div>


      </div>


    </section>

  )

}


export default Skills;