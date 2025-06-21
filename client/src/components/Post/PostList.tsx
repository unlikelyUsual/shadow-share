import React from "react";
import { useGetPostsQuery } from "../../features/post/postSlice";
import no_data from "/img/no_data.jpg";
import user_default_image from "/img/user_profile.jpg";

const PostList: React.FC = () => {
  const { isFetching, isLoading, data } = useGetPostsQuery({
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!data) return <div>No data available</div>;

  const { rows: posts } = data;

  if (posts.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <img src={no_data} alt="" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {posts.map((post) => {
        const author = post.userId;
        const formattedDate = new Date(post.createdAt).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        return (
          <div
            key={post.id}
            className="bg-white mb-3  p-6 rounded-lg shadow-md max-w-xl mx-auto w-full"
          >
            {author && (
              <div className="flex items-center mb-4">
                <img
                  src={user_default_image}
                  // alt={author.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover mr-3"
                />
                <div>
                  <span className="font-semibold text-gray-800 text-lg">
                    {author}
                  </span>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
              </div>
            )}
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {post.title}
            </h4>
            <p className="text-gray-700 text-base">{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
