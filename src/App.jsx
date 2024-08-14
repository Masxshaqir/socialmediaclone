import { createContext, useState, useEffect } from "react";
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
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";

export const AppContext = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const [userEmailInLogin, setUserEmailInLogin] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("authToken");
    const savedEmail = sessionStorage.getItem("userEmail");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedEmail) {
      setUserEmailInLogin(savedEmail);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        currentPath,
        setCurrentPath,
        userData,
        setUserData,
        setUserEmailInLogin,
        userEmailInLogin,
        allUsers,
        setAllUsers,
        following,
        setFollowing,
      }}
    >
      <Router>
        {!token ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <div className="w-100">
            <div className="d-flex w-100">
              <Sidebar />
              <div
                className="w-100 vh-100 custom-margin-lg"
                style={{ paddingTop: "64px" }}
              >
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:id" element={<UserProfile />} />
                </Routes>
              </div>
              <Followers />
            </div>
          </div>
        )}
      </Router>
    </AppContext.Provider>
  );
};

export default App;
