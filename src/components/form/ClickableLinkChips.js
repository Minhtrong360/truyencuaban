import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

import { Container } from "@mui/system";

import { STORIES_PER_PAGE } from "../../app/config";

export default function ClickableLinkChips({ page, setPage, stories }) {
  let iniSx = { bgcolor: "white", color: "black", mr: "13px" };
  let defaultSx = { bgcolor: "red", color: "white", mr: "13px" };
  let iniBtns = [];
  const [btns, setBtns] = useState();

  const btnCount = Math.ceil(stories.length / STORIES_PER_PAGE);

  useEffect(() => {
    iniBtns = [];
    for (let i = 1; i <= btnCount; i++) {
      iniBtns.push(
        <Button
          onClick={() => {
            setPage(i);
          }}
          id={i}
          key={i}
          variant="contained"
          color="error"
          sx={page === i ? iniSx : defaultSx}
          size="small"
        >
          {i}
        </Button>
      );
    }
    setBtns(iniBtns);
  }, [stories, page, setPage]);

  console.log("btns in ClickableLinkChips", btnCount);

  return (
    <Container
      sx={{
        spacing: 2,
        padding: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>{btns}</Box>
    </Container>
  );
}
