import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGetPostsQuery } from "../../features/post/postApi";
import { userAppSelect } from "../../store";
import type { TGetAllPostModel, TGetAllPostQuery } from "../../types/PostType";

const PostList: React.FC = () => {
  const userState = userAppSelect((store) => store.user.user);
  const [allPosts, setAllPosts] = useState<TGetAllPostModel[]>([]);
  const loaderRef = useRef(null);
  const [paginaton, setPagination] = useState<TGetAllPostQuery>({
    idCursor: null,
    timestampCursor: null,
    limit: 2,
  });

  const { isFetching, isLoading, data } = useGetPostsQuery(paginaton, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data?.posts) {
      const p = data?.posts ?? [];
      setAllPosts((prev) => [...prev, ...p]);
    }
  }, [data?.posts]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      const posts = data?.posts ?? [];
      if (target.isIntersecting && !isFetching && posts?.length > 0) {
        const last: TGetAllPostModel = posts[posts.length - 1];
        setPagination({
          ...paginaton,
          timestampCursor: last.posts.updatedAt,
          idCursor: last.posts.id,
        });
      }
    },
    [isFetching, data?.posts]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="grid grid-cols-1 gap-6">
      {allPosts.map((data) => {
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
            className="bg-white mb-3  p-6 rounded-lg shadow-md max-w-xl mx-auto w-full card-box-shadow"
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

      <div ref={loaderRef} style={{ height: "100px", marginTop: "1rem" }}>
        {isLoading || (isFetching && <p>Loading more posts...</p>)}
      </div>
    </div>
  );
};

export default PostList;
