import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './Components/HomePage';
import POSPage from './Components/POS/POSPage';
import Auth from './Components/Auth/Auth'; // Make sure this import is correct
import PrivateRoute from './components/Shared/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Auth />} /> {/* Changed from /Auth.jsx */}
          <Route 
            path="/pos" 
            element={
              <PrivateRoute>
                <POSPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;