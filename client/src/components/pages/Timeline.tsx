import React, { useState, type ChangeEvent, type MouseEvent } from "react";
import { useAddPostMutation } from "../../features/post/postApi";
import type { AddNewPost } from "../../types/PostType";
import ToastHelper from "../../util/ToastHelper";
import PostList from "../Post/PostList";

const Timeline: React.FC = () => {
  const [addPost, { isLoading }] = useAddPostMutation();
  const [fields, setFields] = useState<AddNewPost>({
    title: "",
    content: "",
  });

  const addNewPost = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (fields.title.length == 0 || fields.content.length == 0) {
      ToastHelper.error("Field fill all the fields");
      return;
    }

    await addPost(fields).unwrap();
    ToastHelper.success("Added successfully!");
    setFields({
      title: "",
      content: "",
    });
  };

  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [ev.target.name]: ev.target.value.trim(),
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
      <div className="bg-white mb-5 p-6 rounded-lg shadow-md max-w-xl mx-auto w-full card-box-shadow">
        <h2
          className="flex items-center justify-center text-base ml-3 font-semibold text-gray-900 mb-3"
          id="dialog-title"
        >
          Create Post
        </h2>
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
        <div className="mt-3">
          <button
            onClick={addNewPost}
            disabled={isLoading}
            type="button"
            className="cursor-pointer inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      </div>

      <PostList />
    </div>
  );
};

export default Timeline;
