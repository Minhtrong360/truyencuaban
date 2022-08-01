import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductListPhimhay({ products }) {
  return (
    <Grid container spacing={2} mt={1}>
      {products.slice(0, 15).map((product, index) => (
        <Grid item xs={6} md={4} lg={2.4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductListPhimhay;
