import React, { useEffect } from "react";

import StoriesWithGenres from "../features/story/StoriesWithGenres";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../features/story/storySlice";

function HomePage() {
  const { AllStories, isLoading, error } = useSelector((state) => state.story);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories({ page: 1, limit: 1000 }));
  }, [dispatch]);
  return (
    <>
      <StoriesWithGenres
        genres={"Adventure"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
      <StoriesWithGenres
        genres={"comedy"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
      <StoriesWithGenres
        genres={"drama"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
      <StoriesWithGenres
        genres={"hành động"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
      <StoriesWithGenres
        genres={"magic"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
      <StoriesWithGenres
        genres={"thể thao"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
      <StoriesWithGenres
        genres={"xuyên không"}
        AllStories={AllStories}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

export default HomePage;
