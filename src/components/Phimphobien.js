import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import ProductList from "./ProductList";

import apiService from "../app/apiService";

import LoadingScreen from "./LoadingScreen";
import { API_KEY } from "../app/config";

function Phimphobien() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `movie/popular?api_key=${API_KEY}&language=vi&page=1`
        );
        setProducts(res.data);

        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          mb={0}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            noWrap
            sx={{
              fontSize: 30,
              fontWeight: 800,
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <span>PHIM PHỔ BIẾN</span>
            <a style={{ cursor: "pointer" }} href="product/popular-move">
              XEM TẤT CẢ ▼{" "}
            </a>
          </Typography>
        </Stack>

        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={products.results} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

// function applyFilter(products, filters) {
//   const { sortBy } = filters;
//   let filteredProducts = products;

//   // SORT BY
//   if (sortBy === "featured") {
//     filteredProducts = orderBy(products, ["sold"], ["desc"]);
//   }
//   if (sortBy === "newest") {
//     filteredProducts = orderBy(products, ["createdAt"], ["desc"]);
//   }
//   if (sortBy === "priceDesc") {
//     filteredProducts = orderBy(products, ["price"], ["desc"]);
//   }
//   if (sortBy === "priceAsc") {
//     filteredProducts = orderBy(products, ["price"], ["asc"]);
//   }

//   // FILTER PRODUCTS
//   if (filters.gender.length > 0) {
//     filteredProducts = products.filter((product) =>
//       filters.gender.includes(product.gender)
//     );
//   }
//   if (filters.category !== "All") {
//     filteredProducts = products.filter(
//       (product) => product.category === filters.category
//     );
//   }
//   if (filters.priceRange) {
//     filteredProducts = products.filter((product) => {
//       if (filters.priceRange === "below") {
//         return product.price < 25;
//       }
//       if (filters.priceRange === "between") {
//         return product.price >= 25 && product.price <= 75;
//       }
//       return product.price > 75;
//     });
//   }
//   if (filters.searchQuery) {
//     filteredProducts = products.filter((product) =>
//       product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
//     );
//   }
//   return filteredProducts;
// }

export default Phimphobien;
