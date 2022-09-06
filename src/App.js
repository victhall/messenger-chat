import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from "./components/Signup";
import Login from "./components/Login";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
