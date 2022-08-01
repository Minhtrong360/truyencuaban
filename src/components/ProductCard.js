import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils";
import StarBorderIcon from "@mui/icons-material/StarBorder";
function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}>
      <CardActionArea sx={{ bgcolor: "gray" }}>
        <CardMedia
          component="img"
          height="400"
          image={`https://image.tmdb.org/t/p/original/${product.poster_path}`}
          alt="green iguana"
          sx={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            sx={{
              display: "flex",
              justifyContent: "left",
              fontWeight: 800,
            }}
          >
            {product.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            sx={{
              display: "flex",
              justifyContent: "left",
              fontWeight: 800,
            }}
          >
            {product.vote_average} <StarBorderIcon />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
