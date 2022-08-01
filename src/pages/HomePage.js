import React from "react";

import Phimhay from "../components/Phimhay";

import Phimmoi from "../components/Phimmoi";

import Phimphobien from "../components/Phimphobien";

function HomePage({ genreID }) {
  console.log("homepage", genreID);
  return (
    <>
      <Phimmoi />
      <Phimphobien />
      <Phimhay />
    </>
  );
}

export default HomePage;
