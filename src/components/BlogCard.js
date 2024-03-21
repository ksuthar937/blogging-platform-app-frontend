import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditForm from "./EditForm";
import { Avatar, Box, Collapse, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { API_URL } from "../config";
import { dateFormat } from "../utils/helper";
import toast from "react-hot-toast";
import { deepOrange } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCard({
  title,
  description,
  image,
  id,
  handleDelete,
  authorizedUser,
  fetchBlogs
}) {
  const token = localStorage.getItem("token");
  const [expanded, setExpanded] = React.useState(false);
  const [blogComments, setBlogComments] = React.useState([]);

  const initialState = {
    text: "",
  };

  const [comment, setComment] = React.useState(initialState);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments();
  };

  const getComments = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setBlogComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (e) => {
    setComment((preVal) => ({
      ...preVal,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddComment = async () => {
    try {
      const res = await axios.post(`${API_URL}/blogs/${id}/comments`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        toast.success("Comment added successfully");
        getComments();
        setComment(initialState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={image}
        sx={{ height: { xs: 180, md: 320 } }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {authorizedUser === true ? (
          <>
            <EditForm id={id} fetchBlogs={fetchBlogs} />
            <Button onClick={() => handleDelete(id)} size="small">
              Delete
            </Button>
          </>
        ) : null}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              pb: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            {blogComments.length > 0 ? (
              blogComments.map((comment) => (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                  key={comment._id}
                >
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {comment.text[0]}
                  </Avatar>
                  <div>
                    <Typography variant="subtitle2">{comment.text}</Typography>
                    <Typography variant="caption" gutterBottom>
                      {dateFormat(comment.date)}
                    </Typography>
                  </div>
                </Box>
              ))
            ) : (
              <Typography variant="subtitle2" gutterBottom>
                No comments yet! Add first comment
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              p: 1,
            }}
          >
            <TextField
              id="filled-basic"
              name="text"
              value={comment.text}
              onChange={(e) => handleComment(e)}
              size="small"
              variant="standard"
              placeholder="Write a comment"
              fullWidth
              margin="normal"
              required
            />
            <Button
              size="small"
              variant="contained"
              onClick={() => handleAddComment()}
            >
              Add Comment
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
