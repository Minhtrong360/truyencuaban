import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import { API_KEY } from "../app/config";

function DetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getProduct = async () => {
        setLoading(true);

        try {
          const res = await apiService.get(
            `/movie/${params.id}?api_key=${API_KEY}&language=vi`
          );
          setProduct(res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [params]);
  console.log("first", product);
  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          PhimVui.tv
        </Link>
        {/* <Typography color="text.primary">{params.title}</Typography> */}
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {product && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6} lg={12}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 200,
                                height: 400,
                              }}
                              src={`https://image.tmdb.org/t/p/original/${product.poster_path}`}
                              alt="product"
                            />
                            <Typography
                              color="text.primary"
                              p={2}
                              sx={{ overflow: "auto", textAlign: "justify" }}
                            >
                              {product.overview}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6} p={2}>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.status === "sale"
                                ? "error.main"
                                : "info.main",
                          }}
                        >
                          {product.release_date}
                        </Typography>
                        <Typography variant="h7" paragraph>
                          Thể loại:{" "}
                          {product.genres.map((genre) => (
                            <Button key={genre.id}> {genre.name} </Button>
                          ))}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={product.vote_average}
                            precision={0.5}
                            max={10}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.vote_count} reviews)
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
