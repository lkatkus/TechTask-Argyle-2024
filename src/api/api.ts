import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { User, Post, Comment, UserWithPosts } from "./api.types";
import { mapCommentsToPost, mapUserPostsToUser } from "./api.utils";

const fetchUsers = async (): Promise<User[]> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/users`);

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const fetchPosts = async (): Promise<Post[]> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/posts`);

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const fetchComments = async (): Promise<Comment[]> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/comments`);

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const fetchFullUsersData = async (): Promise<UserWithPosts[]> => {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments(),
  ]);

  const postsWithComments = mapCommentsToPost(posts, comments);
  const usersWithPosts = mapUserPostsToUser(users, postsWithComments);

  return usersWithPosts;
};

export const useFullUsersDataQuery = () => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["usersDataQuery"],
    queryFn: fetchFullUsersData,
  });
};

const deleteUserPost = async (postId: number): Promise<Comment[]> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  const res = await fetch(url, { method: "DELETE" });
  const data = await res.json();

  return data;
};

export const useDeletePostMutation = (
  handleOnSuccess: (postId: number) => void
) => {
  return useMutation({
    mutationFn: deleteUserPost,
    onSuccess: (_data, variables) => {
      handleOnSuccess(variables);
    },
  });
};

const addUserPost = async (newPostData: {
  title: string;
  body: string;
  userId: number;
}): Promise<Post> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/posts`);

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newPostData),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const data = await res.json();

  return data;
};

export const useAddPostMutation = (
  handleOnSuccess: (newPostData: Post) => void
) => {
  return useMutation({
    mutationFn: addUserPost,
    onSuccess: (data) => {
      handleOnSuccess(data);
    },
  });
};
