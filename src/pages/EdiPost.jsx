import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const token = localStorage.getItem('token');
  console.log("Using token:", token);
  
  
  useEffect(() => {
    axios.get(`http://localhost:8081/api/posts/${id}`)
      .then(res => setForm({ title: res.data.title, subtitle: res.data.subtitle, content: res.data.content,image:res.data.image  }))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/posts/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
        <input
        name="subtitle"
        value={form.subtitle}
        onChange={handleChange}
        placeholder="SubTitle"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
       <input type="file" onChange={handleChange} accept="image/*" value={form.image}/>

      <button type="submit">Update</button>
    </form>
  );
}
