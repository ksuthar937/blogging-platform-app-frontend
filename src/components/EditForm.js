import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function EditForm({ id, fetchBlogs }) {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const initialData = {
    title: "",
    description: "",
    imageURL: "",
  };

  const [updateData, setUpdateData] = useState(initialData);

  const handleClickOpen = () => {
    setOpen(true);
    getBlogData();
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateData(initialData);
  };

  const handlePostData = (e) => {
    setUpdateData((preVal) => ({
      ...preVal,
      [e.target.name]: e.target.value,
    }));
  };

  const getBlogData = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUpdateData(res.data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/blogs/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog Updated");
      setOpen(false);
      setUpdateData(initialData);
      fetchBlogs();
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something Wrong");
    }
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <TextField
            value={updateData.title}
            onChange={(e) => handlePostData(e)}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={updateData.description}
            onChange={(e) => handlePostData(e)}
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
          <TextField
            value={updateData.imageURL}
            onChange={(e) => handlePostData(e)}
            required
            margin="dense"
            id="imageURL"
            name="imageURL"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
