import { Suspense, lazy} from "react";
import MainData from "./Components/MainDate";
import Loader from "./Components/Loader";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ChartDashboard from "./Components/ChartDashboard";
import AddressData from "./Components/AddressData";
import Sample from './Components/Sample';

const UserTable = lazy(() => import("./Components/UserTable"));
const Login = lazy(() => import("./Components/Login"));

function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/"];
  const shouldShow = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShow && <Navbar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />   
           <Route path="/UserTable" element={<UserTable />} />
          <Route path="/maindata" element={<MainData />} />
          <Route path="/chartDashboard" element={<ChartDashboard />} />
           <Route path="/addressdata" element={<AddressData />} />
           <Route path="/sample" element={<Sample />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />

    </Router>
  );
}

export default App;
