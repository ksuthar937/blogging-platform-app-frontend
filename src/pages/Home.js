import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "../config";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import CreateForm from "../components/CreateForm";
import { dateFormat } from "../utils/helper";

const Home = () => {
  const token = localStorage.getItem("token");
  const userLogin = localStorage.getItem("user");

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setBlogs(res.data.blogs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        toast.success("Blog deleted");
        fetchBlogs();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h5" align="center">
          Welcome to daily blogging platform
        </Typography>
        <Typography variant="subtitle1" align="center">
          {dateFormat(Date.now())}
        </Typography>
        <CreateForm fetchBlogs={fetchBlogs} />
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Container sx={{ mt: 5 }}>
          {blogs
            ? blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.imageURL}
                  handleDelete={handleDelete}
                  authorizedUser={blog.user === userLogin ? true : false}
                  fetchBlogs={fetchBlogs}
                />
              ))
            : null}
        </Container>
      )}
    </>
  );
};

export default Home;
