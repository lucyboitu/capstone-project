import { useState } from 'react';
// import axios from 'axios';
import api from '../api/axios'; 
import { Link, useNavigate } from 'react-router-dom';
import '../components/Form.css';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async e => {
  e.preventDefault();
  setError('');
  try {
    const res = await api.post('http://localhost:8081/api/auth/login', form);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    const checkTokenAndNavigate = () => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/create-post');
      } else {
        setTimeout(checkTokenAndNavigate, 100);
      }
    };

    checkTokenAndNavigate();
  } catch (err) {
    console.error('Login error:', err);
    setError(err.response?.data?.error || 'Login failed');
  }
};

  return (
    <div className='content'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
