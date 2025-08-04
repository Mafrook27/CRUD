import { Suspense, lazy } from "react";

import Loader from "./Components/Loader";
import Signup from "./Components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const UserTable = lazy(() => import("./Components/UserTable"));
const Login = lazy(()=>import("./Components/Login"));
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <div>
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="/UserTable" element={<UserTable />} />
            </Routes>
          </Suspense>
        </div>
        </Router>
      </div>
    </>
  );
}

export default App;
