import * as React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect, useRef } from "react";
import apiService from "../../app/apiService";
import { API_KEY } from "../../app/config";
import { useNavigate } from "react-router-dom";
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

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelectPlaceholder({ genreID, setGenreID }) {
  // const [personName, setPersonName] = React.useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=vi`
        );
        setProducts(res.data.genres);

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
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Select
          multiple
          displayEmpty
          value={[]}
          sx={{ fontWeight: 400, color: "white", fontSize: "1.2rem" }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>THỂ LOẠI KHÁC</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>none</em>
          </MenuItem>

          {products.map((product) => (
            <MenuItem
              key={product.name}
              value={product.name}
              // ref={ref}
              onClick={() => {
                setGenreID(product);
                navigate(`product/genre-move`);
              }}
              // style={getStyles(name, personName, theme)}
            >
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
