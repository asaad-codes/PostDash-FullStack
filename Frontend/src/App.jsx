import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost.jsx";
import Feed from "./pages/Feed.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* These routes cover all your bases */}
        <Route path="/" element={<Feed />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;