import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout({ genreID, setGenreID, setSearch }) {
  console.log("mainlayout", genreID);
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader
        genreID={genreID}
        setGenreID={setGenreID}
        setSearch={setSearch}
      />

      <Outlet genreID={genreID} setGenreID={setGenreID} setSearch={setSearch} />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
