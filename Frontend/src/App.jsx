import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

import ProjectDetails from "./pages/ProjectDetails";
import BlogDetails from "./pages/BlogDetails";


import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminBlogs from "./pages/AdminBlogs";


import ProtectedRoute from "./components/ProtectedRoute";
import AdminMessages from "./pages/AdminMessages";




function AppLayout(){


  const location = useLocation();



  const isAdminPage =
    location.pathname.startsWith("/admin");



  return (

    <>


      {
        !isAdminPage && <Navbar />
      }



      <Routes>


        {/* PUBLIC ROUTES */}


        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/about"
          element={<About />}
        />


        <Route
          path="/projects"
          element={<Projects />}
        />


        <Route
          path="/projects/:slug"
          element={<ProjectDetails />}
        />



        <Route
          path="/blog"
          element={<Blog />}
        />


        <Route
          path="/blog/:slug"
          element={<BlogDetails />}
        />



        <Route
          path="/contact"
          element={<Contact />}
        />



        <Route
          path="/login"
          element={<Login />}
        />


        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
          <ProtectedRoute>
              <AdminBlogs />
          </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
          <ProtectedRoute>
            <AdminMessages />
          </ProtectedRoute>
          }
        />


      </Routes>

      {
        !isAdminPage && <Footer />
      }



    </>

  );

}


function App(){


  return (

    <BrowserRouter>

      <AppLayout />

    </BrowserRouter>

  );

}



export default App;