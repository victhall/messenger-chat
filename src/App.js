import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from '../src/components/Home';
import ResetPassword from './components/ResetPassword';
import { AuthProvider } from './contexts/AuthProvider';
import Chat from './components/Chat';


function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
