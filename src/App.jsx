import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreateBlog';
import ViewBlog from './pages/ViewBlog';
import EditPost from './pages/EdiPost';

function App() {
  const token = localStorage.getItem('token');

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/post/:id" element={<ViewBlog />} />
        <Route path="/create-post" element={
        <ProtectedRoute>
              <CreatePost />
        </ProtectedRoute>
          }
        />
        <Route path="/edit-post/:id" element={
           <ProtectedRoute>
           <EditPost />
          </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
