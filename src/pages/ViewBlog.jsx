import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewBlog.css';

export default function ViewBlog() {
  const { id } = useParams();
    const navigate = useNavigate();
  const [post, setPost] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8081/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);
const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:8081/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    navigate('/');
  } catch (err) {
    console.error('Delete error:', err);
  }
};
  if (!post) return <p>Loading...</p>;

const isLoggedIn = !!user;

console.log("User:", user);
console.log("Post Author:", post.author);
console.log("Is Owner:", isLoggedIn);


  return (
    <div className='view-blog'>
      <h2>{post.title}</h2>
      <h4>{post.subtitle}</h4>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title}  />}
      <p>Author:<span>{post.author?.username || 'Unknown'}</span> </p>
{isLoggedIn && (
  <>
  <div className='button-group'>
    <button onClick={() => navigate(`/edit-post/${post._id}`)} className='btn-edit'>Edit</button>
    <button onClick={handleDelete}  className='btn-delete'>Delete</button>
  </div>
  </>
)}
    </div>

  );
}
``