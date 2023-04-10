import * as React from "react";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";

function ProductCard({ story }) {
  const navigate = useNavigate();

  return (
    <Box>
      <Card onClick={() => navigate(`/story/${story._id}`)}>
        <CardActionArea sx={{ bgcolor: "gray" }}>
          <CardMedia
            component="img"
            height="400"
            image={typeof story?.cover === "string" ? story.cover : ""}
            alt={story?.title}
            sx={{ objectFit: "fill" }}
          />
        </CardActionArea>
      </Card>
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "left",
          fontWeight: 800,
          marginTop: 2,
        }}
      >
        {story?.title?.toUpperCase()}
      </Typography>
    </Box>
  );
}

export default ProductCard;
