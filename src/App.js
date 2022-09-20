import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from '../src/components/Home';
import Card from './UI/Card'
import ResetPassword from './components/ResetPassword';
import { AuthProvider, useAuth } from './contexts/AuthProvider';


function App() {

  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/card" element={<Card />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
