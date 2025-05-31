import axios from 'axios';

export const createPost = async (postData) => {
    console.log('Request Body:', req.body); 

  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.post('http://localhost:8081/api/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Post created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error;
  }
};
