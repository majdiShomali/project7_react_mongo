import "./App.css";
import { UserContext } from "./UserContext";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavListMenu from "./components/Navbar";
// import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
// import Kitchen from "./pages/Kitchen";
// import Admin from "./pages/Admin";
import About from "./pages/aboutPage/About";
// import Recipes from "./pages/Recipes";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
// import ShowRecipe from "./pages/ShowRecipe";
// import Kitchens from "./pages/Kitchens";


import Sidebar from "./pages/dashboard/Sidebar";
import NavListMenuD from "./pages/dashboard/NavDashboard";
import MainDashboard from "./pages/dashboard/MainDashboard";
// import UserProfile from "./pages/UserProfile";
import UserInfo from "./components/dashboard/UserInfo"
import ApproveTable from "./components/dashboard/ApproveTable";
import AdminInfo from "./components/dashboard/AdminInfo";


import axios from "axios";

export default function App() {
  const [hideRouter1, setHideRouterUser] = useState(false);
  const [hideRouter2, setHideRouterAdmin] = useState(true);
  const [hideRouter3, setHideRouterProvider] = useState(true);

  // const { routs, updateRouts } = useContext(UserContext);


  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("auth");
      console.log(token);
      if (token) {
        const response = await axios.get("http://localhost:5000/protected", {
          headers: {
            Authorization: token,
          },
        });
        let x =[];
        
        if(response.data.user.role ==1){
          x= [true ,false,true ]
        }else if (response.data.user.role ==2){
          x= [true ,true,false]
        }else{
          x= [false ,true,true ]
        }
        setHideRouterUser(x[0]);
        setHideRouterAdmin(x[1]);
        setHideRouterProvider(x[2]);
        // updateRouts(x)

      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("auth");
      window.location.href = "http://localhost:3000/Login";
    } finally {
      console.log(false);
    }
  };







  useEffect(() => {
    if (localStorage.auth != null) {
      fetchProtectedData()
    }
  }, []);

  const AppRouter1 = () => {
    return (
      <Router>
        <NavListMenu />
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="ContactUs" element={<Contact />} /> 
          <Route path="About" element={<About />} /> 
          <Route path="SignUp" element={<SignUp />} />
          <Route path="LogIn" element={<LogIn />} />
          {/* <Route path="ShowRecipe" element={<ShowRecipe />} />
          <Route path="Recipes" element={<Recipes />} />
          <Route path="Kitchen" element={<Kitchen />} />
          <Route path="UserProfile" element={<UserProfile />} />
          <Route path="/Kitchen/:type_Kitchen" element={<Kitchens />} /> */}
        </Routes>
        <Footer />
      </Router>
    );
  };

  const AppRouter2 = () => {
    return (
      <Router>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <NavListMenuD />
          <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="ListUser" element={<UserInfo />} />
            {/* <Route path="UserProfile" element={<UserProfile />} /> */}
            <Route path="ListRestaurant" element={<ApproveTable />} />
            <Route path="ListAdmin" element={<AdminInfo />} />
          </Routes>
        </div>
      </Router>
    );
  };

  const AppRouter3 = () => {
    return (
      <Router>
        {/* <NavListMenu /> */}
        <Routes>
          {/* <Route index element={<Admin />} />
          <Route path="ContactUs" element={<Contact />} />
          <Route path="About" element={<About />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="LogIn" element={<LogIn />} /> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    );
  };

  return (
    <>
      {hideRouter1 ? null : (
        <>
          <AppRouter1 />
        </>
      )}

      {hideRouter2 ? null : (
        <>
          <div className="flex">
            <AppRouter2 />
          </div>
        </>
      )}

      {hideRouter3 ? null : (
        <>
          <AppRouter3 />
        </>
      )}
 
    </>

  );
}
