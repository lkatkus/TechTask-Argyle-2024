import { useMutation, useQuery } from "@tanstack/react-query";
import { User, Post, PostComment } from "./api.types";

const fetchUsers = async (): Promise<User[]> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/users`);

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
};

const fetchUserPosts = async (userId: number): Promise<Post[]> => {
  const url = new URL(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export const useUserPostsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => fetchUserPosts(userId),
  });
};

const fetchUserPostComments = async (
  postId: number
): Promise<PostComment[]> => {
  const url = new URL(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export const useUserPostCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["userPostComments", postId],
    queryFn: () => fetchUserPostComments(postId),
  });
};

const deleteUserPost = async (postId: number): Promise<PostComment[]> => {
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
