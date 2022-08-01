import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";

import { Container } from "@mui/system";

export default function ClickableLinkChips({ page, setPage }) {
  let iniSx = { bgcolor: "white", color: "black", mr: "3px" };
  let defaultSx = { bgcolor: "red", color: "white", mr: "3px" };
  const iniBtns = [];
  const [btns, setBtns] = useState(iniBtns);

  for (let i = 1; i < 11; i++) {
    iniBtns.push(
      <Button
        onClick={() => {
          setPage(i);
          handleChangecolorbtn(i);
        }}
        id={i}
        key={i}
        variant="contained"
        color="error"
        sx={defaultSx}
        size="small"
      >
        {i}
      </Button>
    );
    const handleChangecolorbtn = (item) => {
      const newItem = [];
      newItem.push(
        <Button
          onClick={() => {
            setPage(item);
            handleChangecolorbtn(item);
          }}
          id={item}
          key={item}
          variant="contained"
          color="error"
          sx={iniSx}
          size="small"
        >
          {item}
        </Button>
      );
      const newBtn = btns.slice();
      newBtn[item - 1] = newItem[0];
      setBtns(newBtn);
    };
  }

  return (
    <Container
      sx={{ spacing: 2, padding: 2, display: "flex", justifyContent: "center" }}
    >
      {btns.map((button) => button)}
    </Container>
  );
}
