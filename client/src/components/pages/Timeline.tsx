import React from "react";
import PostList from "../Post/PostList";

const Timeline: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">Latest Posts</h3>
      <PostList />
    </div>
  );
};

export default Timeline;
