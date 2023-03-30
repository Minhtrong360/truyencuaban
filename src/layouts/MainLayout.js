import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import AlertMsg from "../components/form/AlertMsg";

function MainLayout({ genreID, setGenreID, search, setSearch }) {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader
        genreID={genreID}
        setGenreID={setGenreID}
        search={search}
        setSearch={setSearch}
      />
      <AlertMsg />
      <Outlet
        genreID={genreID}
        setGenreID={setGenreID}
        search={search}
        setSearch={setSearch}
      />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
