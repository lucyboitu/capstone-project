import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Form.css';


export default function CreateBlog() {
  const [form, setForm] = useState({ title: '', subtitle: '', content: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = e => setImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('subtitle', form.subtitle);
      formData.append('content', form.content);
      if (image) formData.append('image', image);

      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8081/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="subtitle" placeholder="Subtitle" onChange={handleChange} />
        <textarea name="content" placeholder="Content" onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" className='ml-auto'>Create</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
