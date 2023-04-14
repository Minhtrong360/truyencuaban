import * as React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../../features/story/storySlice";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectPlaceholder() {
  // const [personName, setPersonName] = React.useState([]);
  const { AllStories } = useSelector((state) => state.story);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStories({ page: 1, limit: 10000000000 }));
  }, [dispatch]);

  let GenresAllow = [
    "Action",
    "Adventure",
    "Chuyển sinh",
    "Comedy",
    "Cổ đại",
    "Drama",
    "Fantasy",
    "Manhwa",
    "Magic",
    "Mystery",
    "Ngôn tình",
    "Thể thao",
    "Trọng sinh",
    "Truyện màu",
    "Xuyên không",
  ];

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Select
          multiple
          displayEmpty
          value={[]}
          sx={{
            fontWeight: 400,
            color: "white",
            fontSize: "1.2rem",
          }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em> Thể loại khác</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {GenresAllow.map((genre) => (
            <MenuItem
              sx={{ padding: "7.5px 14px" }}
              key={genre}
              value={genre}
              // ref={ref}
              onClick={() => {
                navigate(`stories/:${genre}`);
              }}
              // style={getStyles(name, personName, theme)}
            >
              {genre?.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
