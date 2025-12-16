import { Routes, Route } from "react-router";
import { ChaptersPage, StoriesPage } from "../../pages";
import { ChaptersBody } from "../ChaptersBody";

function App() {
  return (
    <Routes>
      <Route path="stories" element={<StoriesPage />} />
      <Route path="stories/:storyId" element={<ChaptersPage />}>
        <Route index element={<div>loading...</div>} />
        <Route path="chapters/:chapterId" element={<ChaptersBody />} />
      </Route>
    </Routes>
  );
}

export default App;
