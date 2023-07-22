import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";
import Login from "./login";
import Dashboard from "./Dashboard";

import axios from "axios";
import Register from "./register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    function checkLoginStatus() {
      axios
        .get("http://localhost:3000/user/me", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.message);
          // console.log(res.data.name.username);
          setEmail(res.data.userDetails.email);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          // console.log(err);
          setIsLoggedIn(false);
        });
    }

    checkLoginStatus();
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        {/* logout */}
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          email={email}
          setEmail={setEmail}
        />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          {/* <Route path="/:id" element={<Blog />} /> */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
