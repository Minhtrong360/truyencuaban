import React from "react";

import StoriesWithGenres from "../features/story/StoriesWithGenres";

function HomePage() {
  return (
    <>
      <StoriesWithGenres genres={"xuyên không"} />

      <StoriesWithGenres genres={"thể thao"} />
      <StoriesWithGenres genres={"Adventure"} />
      <StoriesWithGenres genres={"magic"} />
      <StoriesWithGenres genres={"comedy"} />
      <StoriesWithGenres genres={"drama"} />
      <StoriesWithGenres genres={"hành động"} />
    </>
  );
}

export default HomePage;
