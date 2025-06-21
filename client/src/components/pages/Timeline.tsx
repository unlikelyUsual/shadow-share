import React, { useState, type ChangeEvent, type MouseEvent } from "react";
import { useAddPostMutation } from "../../features/post/postSlice";
import type { AddNewPost } from "../../types/PostType";
import ToastHelper from "../../util/ToastHelper";
import PostList from "../Post/PostList";

const Timeline: React.FC = () => {
  const [addPost, { isLoading }] = useAddPostMutation();
  const [showModel, setShowModel] = useState<boolean>(false);
  const [fields, setFields] = useState<AddNewPost>({
    title: "",
    content: "",
  });

  const addNewPost = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const res = await addPost(fields).unwrap();
    console.log(`Response`, res);
    ToastHelper.success("Added successfully!");
    setShowModel(false);
    setFields({
      title: "",
      content: "",
    });
  };

  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value,
    });
  };

  const onTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">Latest Posts</h3>
      <button
        className="justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
        onClick={() => setShowModel(true)}
        disabled={isLoading}
      >
        Add Post
      </button>
      <PostList />

      <div
        className="relative z-10"
        aria-labelledby="dialog-title"
        role="dialog"
        aria-modal="true"
        style={{ display: showModel ? "block" : "none" }}
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="text-center">
                  <div className="flex">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-600 sm:mx-0 sm:size-10">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                        />
                      </svg>
                    </div>
                    <h3
                      className="flex items-center justify-center text-base ml-3 font-semibold text-gray-900"
                      id="dialog-title"
                    >
                      Create Post
                    </h3>
                  </div>
                  <div className="mt-4 mb-2 max-w-sm mx-auto">
                    <div className="mb-2">
                      <input
                        type="text"
                        onChange={onInputChange}
                        value={fields.title}
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title for your post"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <textarea
                        onChange={onTextChange}
                        value={fields.content}
                        name="content"
                        placeholder="Your thougths 💬"
                        rows={5}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={addNewPost}
                  type="button"
                  className="cursor-pointer inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModel(false)}
                  type="button"
                  className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
