import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Followers from "./components/Followers";
import Profile from "./components/Profile";
import Header from "./components/Header";

const App = () => {
  const [token, setToken] = useState(null);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const savedToken = sessionStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      {token === null ? (
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="w-100">
          <div className="d-flex w-100">
            <Sidebar setCurrentPath={setCurrentPath} />
            <div
              className="w-100 vh-100 custom-margin-lg"
              style={{ paddingTop: "70px" }}
            >
              <Header currentRoute={currentPath} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <Followers />
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
