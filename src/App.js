import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
