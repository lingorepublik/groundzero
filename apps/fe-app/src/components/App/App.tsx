import { Routes, Route } from "react-router";
import { ChaptersPage, StoriesPage } from "../../pages";
import { ChaptersBody } from "../ChaptersBody";
import { Auth } from "../Auth";
import { SignUp } from "../SignUp";
import { SignIn } from "../SignIn";
import { SignOff } from "../SignOff";
import { useToken } from "react-query";

function App() {
  useToken();

  return (
    <Routes>
      <Route path="stories" element={<StoriesPage />} />
      <Route path="stories/:storyId" element={<ChaptersPage />}>
        <Route index element={<div>loading...</div>} />
        <Route path="chapters/:chapterId" element={<ChaptersBody />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route index element={<div>auth default page</div>} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-off" element={<SignOff />} />
      </Route>
    </Routes>
  );
}

export default App;
