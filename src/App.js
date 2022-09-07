import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from './components/ForgotPassword';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
