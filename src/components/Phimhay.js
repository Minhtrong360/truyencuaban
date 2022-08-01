import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import apiService from "../app/apiService";

import LoadingScreen from "./LoadingScreen";
import { API_KEY } from "../app/config";
import ProductListPhimhay from "./ProductListPhimhay";

function Phimhay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `movie/top_rated?api_key=${API_KEY}&language=vi`
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
      {/* <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack> */}
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
            <span>PHIM HAY</span>
            <a style={{ cursor: "pointer" }} href="product/good-move">
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
                <ProductListPhimhay products={products.results} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default Phimhay;
