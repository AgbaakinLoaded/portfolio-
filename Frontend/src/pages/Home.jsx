import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Contact from "../components/Contact"
import LatestBlogs from "../components/LatestBlogs";


function Home() {

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <LatestBlogs/>
      <Contact />
    </>
  )
}


export default Home