import { User, Post, Comment, UserWithPosts, UserPost } from "./api.types";

export const mapCommentsToPost = (
  posts: Post[],
  comments: Comment[]
): UserPost[] => {
  const commentsByPostId: { [key: number]: Comment[] } = {};

  comments.forEach((comment) => {
    if (commentsByPostId[comment.postId]) {
      commentsByPostId[comment.postId].push(comment);
    } else {
      commentsByPostId[comment.postId] = [comment];
    }
  });

  const mappedPosts: UserPost[] = posts.map((post) => ({
    ...post,
    comments: commentsByPostId[post.id] || [],
  }));

  return mappedPosts;
};

export const mapUserPostsToUser = (
  users: User[],
  posts: UserPost[]
): UserWithPosts[] => {
  const postsByUserId: { [key: number]: UserPost[] } = {};

  posts.forEach((post) => {
    if (postsByUserId[post.userId]) {
      postsByUserId[post.userId].push(post);
    } else {
      postsByUserId[post.userId] = [post];
    }
  });

  const mappedUsers: UserWithPosts[] = users.map((user) => ({
    ...user,
    posts: postsByUserId[user.id],
  }));

  return mappedUsers;
};
