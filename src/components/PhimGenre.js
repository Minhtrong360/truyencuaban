import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";

import apiService from "../app/apiService";

import LoadingScreen from "./LoadingScreen";
import { API_KEY } from "../app/config";

import ClickableLinkChips from "./form/ClickableLinkChips";

import ProductList from "./ProductList";

function PhimGenre({ genreID, setGenreID }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `discover/movie?api_key=${API_KEY}&language=vi&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreID.id}&with_watch_monetization_types=flatrate`
        );
        setProducts(res.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, [page, genreID.id]);
  console.log("SOS", products);
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
            <span>{genreID.name}</span>
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
        <ClickableLinkChips page={page} setPage={setPage} />
      </Stack>
    </Container>
  );
}

export default PhimGenre;
