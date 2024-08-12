import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Followers from "./components/Followers";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <div className="w-100">
        <div className="d-flex w-100">
          <Sidebar />
          <div
            className="w-100 vh-100 custom-margin-lg p-2 border-end border-start border-1 border-lightgray"
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Followers />
        </div>
      </div>
    </Router>
  );
};

export default App;
