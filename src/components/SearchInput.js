import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <form onSubmit={onSubmit} sx={{ heigth: "100%" }}>
      <TextField
        value={searchQuery}
        placeholder="Tìm theo tên"
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: 250 }}
        size="small"
        InputProps={{
          sx: {
            padding: "9.5px 14px",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
