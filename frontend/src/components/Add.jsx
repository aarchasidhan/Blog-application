import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';

const Add = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogToEdit = location.state?.blog;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setImgUrl(blogToEdit.img_url);
      setId(blogToEdit._id);
    }
  }, [blogToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      content,
      img_url: imgUrl
    };

    try {
      if (id) {
        await axios.put(`http://localhost:3001/update/${id}`, blogData);
        alert('Blog updated successfully');
      } else {
        await axios.post(`http://localhost:3001/add`, blogData);
        alert('Blog added successfully');
      }
      navigate('/');
    } catch (err) {
      console.error("Error submitting blog:", err.message);
      alert("Error occurred. See console.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(163, 195, 225, 0.9)), url(https://i.pinimg.com/736x/39/6f/4d/396f4dea4fd60352b438e62e710d382d.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <Typography variant="h5" mb={2}>
            {id ? 'Edit Blog' : 'Add New Blog'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {id ? 'Update Blog' : 'Add Blog'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Add;