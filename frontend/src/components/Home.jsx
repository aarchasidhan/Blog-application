import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => setBlogs(blogs.filter(blog => blog._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleUpdate = (blog) => {
    navigate("/add", { state: { blog } });
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        // Background styling to match Add page:
        backgroundImage: "linear-gradient(rgba(170, 167, 167, 0.9), rgba(182, 159, 159, 0.9)), url(https://i.pinimg.com/1200x/6c/3f/e6/6c3fe690c7cac7dc6105ca3a43b31fe4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ 
          color: "#1976d2",
          fontWeight: "bold",
          mb: 4,
          letterSpacing: 1,
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        BlogApp
      </Typography>

      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              sx={{
                height: 400,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.1)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 16px rgba(25, 118, 210, 0.15)"
                }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${blog.img_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                }}
              >
                <Box>
                  <Chip 
                    label={blog.category} 
                    color="primary" 
                    size="small"
                    sx={{ mb: 1.5 }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1.5,
                      color: "#333",
                    }}
                  >
                    {blog.title}
                  </Typography>
                </Box>

                <Box 
                  sx={{ 
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                    }}
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                    }}
                    onClick={() => handleUpdate(blog)}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;