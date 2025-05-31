import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import myImage from '../assets/images/side-image.png'; 
    

export default function Home() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8081/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleCreatePostClick = () => {
    if (token) {
      navigate('/create-post'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className='container'>
      <div className='left-side'>
      <h1>Blogs that can<br /> be  interesting.</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul className='posts'>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </Link>
          </li>
          
        ))}
      </ul>
        <button onClick={handleCreatePostClick}>Create Post</button>
        
      </div>
      <div className="right-side">
        <div className='side-image'>
          <img src={myImage} alt="Side Image"/>
          </div>
      </div>
    </div>

  );
}
