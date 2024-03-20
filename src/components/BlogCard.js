import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BlogCard({
  title,
  description,
  image,
  id,
  handleDelete,
  authorizedUser,
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="180"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {authorizedUser === true ? (
        <CardActions>
          <Button size="small">Edit</Button>
          <Button onClick={() => handleDelete(id)} size="small">
            Delete
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
