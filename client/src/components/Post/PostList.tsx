import React, { useState } from "react";
import { useGetPostsQuery } from "../../features/post/postApi";
import { userAppSelect } from "../../store";
import type { TGetAllPostQuery } from "../../types/PostType";
import no_data from "/img/no_data.jpg";

const PostList: React.FC = () => {
  const userState = userAppSelect((store) => store.user.user);
  const [paginaton, setPagination] = useState<TGetAllPostQuery>({
    idCursor: null,
    timestampCursor: null,
    limit: 2,
  });

  const {
    isFetching,
    isLoading,
    data,
    refetch: fetchAgain,
  } = useGetPostsQuery(paginaton, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (!data) return <div>No data available</div>;

  const { posts } = data;

  if (posts.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <img src={no_data} alt="" />
      </div>
    );
  }

  const nextPage = () => {
    const lagePost = posts[posts.length - 1];
    setPagination({
      ...paginaton,
      idCursor: lagePost.posts.id,
      timestampCursor: lagePost.posts.updatedAt.toISOString(),
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {posts.map((data) => {
        const author = data.user;
        const isMe = data.user?.id === userState?.id;
        const post = data.posts;
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
            {author?.name && (
              <div className="flex items-center mb-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer mr-3"
                  style={{
                    backgroundImage: `url(${
                      "https://placehold.co/40x40/CCCCCC/000000?text=" +
                      author.name.split("")[0]
                    })`,
                  }}
                ></div>
                <div>
                  <span className="font-semibold text-gray-800 text-lg">
                    {isMe ? "Me" : author.username}
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
