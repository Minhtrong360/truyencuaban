import React from "react";

import StoriesWithGenres from "../features/story/StoriesWithGenres";

function HomePage() {
  return (
    <>  
      <StoriesWithGenres genres={"Adventure"} />
      <StoriesWithGenres genres={"comedy"} />
      <StoriesWithGenres genres={"drama"} />
      <StoriesWithGenres genres={"hành động"} />
      <StoriesWithGenres genres={"magic"} />
      <StoriesWithGenres genres={"thể thao"} />
      <StoriesWithGenres genres={"xuyên không"} />
    </>
  );
}

export default HomePage;
