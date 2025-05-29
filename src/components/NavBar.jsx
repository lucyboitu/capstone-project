
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
    <div className='topbar'>    
      <div className='logo'>SCOTCHED<br></br><span>stories</span></div>
    </div>
    <div className='navbar'>
        <nav style={{ padding: '2rem'}}>
          <Link to="/">Home</Link>

          {token ? (
            <>
              {' | '}
              <Link to="/create-post">Create Post</Link>
              {' | '}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {' | '}
              <Link to="/login">Login</Link>
              {' | '}
              <Link to="/signup">Signup</Link>
            </>

          )}
          
        </nav>
    </div>
    </>
  );
}
