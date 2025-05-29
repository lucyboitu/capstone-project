import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
    console.log('ProtectedRoute token:', token);
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
