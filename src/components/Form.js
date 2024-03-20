import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

export default function Form() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const initialData = {
    title: "",
    description: "",
    imageURL: "",
  };

  const [postData, setPostData] = useState(initialData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostData(initialData);
  };

  const handlePostData = (e) => {
    setPostData((preVal) => ({
      ...preVal,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}/blogs`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);
      toast.success("Blog Created");
      setOpen(false);
      setPostData(initialData);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something Wrong");
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<CreateIcon />}
        onClick={handleClickOpen}
      >
        Create Blog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a blog, please fill below required data.
          </DialogContentText>
          <TextField
            value={postData.title}
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
            value={postData.description}
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
            value={postData.imageURL}
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
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
