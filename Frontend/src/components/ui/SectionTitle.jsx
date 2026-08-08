function SectionTitle({ title, subtitle }) {


  return (

    <div className="text-center mb-12">


      <h2 className="text-4xl font-bold">
        {title}
      </h2>


      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        {subtitle}
      </p>


    </div>

  )

}


export default SectionTitle;