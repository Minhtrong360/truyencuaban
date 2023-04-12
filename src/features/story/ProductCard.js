import * as React from "react";
import Card from "@mui/material/Card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";

function ProductCard({ story }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/story/${story._id}`)}
      sx={{ backgroundImage: "none" }}
    >
      <Box sx={{ position: "relative" }}>
        <CardActionArea sx={{ bgcolor: "gray" }}>
          <CardMedia
            component="img"
            height="400"
            image={typeof story?.cover === "string" ? story.cover : ""}
            alt={story?.title}
            sx={{ objectFit: "fill" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "-5%",
              left: "10%",
              transform: "translate(-50%, 50%)",
              textAlign: "center",
              backgroundColor: "black",
              color: "green",
              padding: "0.5rem",
            }}
          >
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {story?.view} <VisibilityIcon sx={{ paddingLeft: "5px" }} />
            </Typography>
          </Box>
        </CardActionArea>
      </Box>
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
    </Card>
  );
}

export default ProductCard;
