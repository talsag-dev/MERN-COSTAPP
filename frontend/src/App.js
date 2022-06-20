import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import CreateCost from "./pages/CreateCost";
import Report from "./pages/Report";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/createUser' element={<CreateUser />} />
          <Route path='/createCost' element={<CreateCost />} />
          <Route path='/report' element={<Report />} />
        </Routes>
    </Router>
  );
}

export default App;
