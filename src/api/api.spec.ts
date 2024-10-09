import { expect, describe, it } from "vitest";
import { Comment, Post, User, UserPost } from "./api.types";
import { mapCommentsToPost, mapUserPostsToUser } from "./api.utils";

describe("api.spec", () => {
  describe("mapCommentsToPost", () => {
    it("should return an empty array if no posts are provided", () => {
      const posts: Post[] = [];
      const comments: Comment[] = [];
      const result = mapCommentsToPost(posts, comments);

      expect(result).toEqual([]);
    });

    it("should return posts with an empty comments array when no comments are provided", () => {
      const posts: Post[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
      ];
      const comments: Comment[] = [];
      const result = mapCommentsToPost(posts, comments);

      expect(result).toEqual([
        {
          userId: 1,
          id: 1,
          title: "Post 1",
          body: "Body 1",
          comments: [],
        },
      ]);
    });

    it("should map comments to the correct post", () => {
      const posts: Post[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
        { userId: 1, id: 2, title: "Post 2", body: "Body 2" },
      ];
      const comments: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: "Comment 1",
          email: "email1@example.com",
          body: "Comment Body 1",
        },
        {
          postId: 1,
          id: 2,
          name: "Comment 2",
          email: "email2@example.com",
          body: "Comment Body 2",
        },
        {
          postId: 2,
          id: 3,
          name: "Comment 3",
          email: "email3@example.com",
          body: "Comment Body 3",
        },
      ];
      const result = mapCommentsToPost(posts, comments);

      expect(result).toEqual([
        {
          userId: 1,
          id: 1,
          title: "Post 1",
          body: "Body 1",
          comments: [
            {
              postId: 1,
              id: 1,
              name: "Comment 1",
              email: "email1@example.com",
              body: "Comment Body 1",
            },
            {
              postId: 1,
              id: 2,
              name: "Comment 2",
              email: "email2@example.com",
              body: "Comment Body 2",
            },
          ],
        },
        {
          userId: 1,
          id: 2,
          title: "Post 2",
          body: "Body 2",
          comments: [
            {
              postId: 2,
              id: 3,
              name: "Comment 3",
              email: "email3@example.com",
              body: "Comment Body 3",
            },
          ],
        },
      ]);
    });

    it("should not assign comments to posts when post ids do not match", () => {
      const posts: Post[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
      ];
      const comments: Comment[] = [
        {
          postId: 2,
          id: 1,
          name: "Comment 1",
          email: "email1@example.com",
          body: "Comment Body 1",
        },
      ];
      const result = mapCommentsToPost(posts, comments);

      expect(result).toEqual([
        {
          userId: 1,
          id: 1,
          title: "Post 1",
          body: "Body 1",
          comments: [],
        },
      ]);
    });

    it("should handle posts without any associated comments", () => {
      const posts: Post[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
        { userId: 1, id: 2, title: "Post 2", body: "Body 2" },
      ];
      const comments: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: "Comment 1",
          email: "email1@example.com",
          body: "Comment Body 1",
        },
      ];
      const result = mapCommentsToPost(posts, comments);

      expect(result).toEqual([
        {
          userId: 1,
          id: 1,
          title: "Post 1",
          body: "Body 1",
          comments: [
            {
              postId: 1,
              id: 1,
              name: "Comment 1",
              email: "email1@example.com",
              body: "Comment Body 1",
            },
          ],
        },
        {
          userId: 1,
          id: 2,
          title: "Post 2",
          body: "Body 2",
          comments: [],
        },
      ]);
    });

    it("should return posts with comments even if post has no comments array (i.e. undefined comments)", () => {
      const posts: Post[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
        { userId: 1, id: 2, title: "Post 2", body: "Body 2" },
      ];
      const comments: Comment[] = [
        {
          postId: 1,
          id: 1,
          name: "Comment 1",
          email: "email1@example.com",
          body: "Comment Body 1",
        },
      ];
      const result = mapCommentsToPost(posts, comments);

      result.forEach((post) => {
        expect(post.comments).toBeDefined();
      });
    });
  });

  describe("mapUserPostsToUser", () => {
    it("should return an empty array if no users are provided", () => {
      const users: Partial<User>[] = [];
      const posts: UserPost[] = [];

      const result = mapUserPostsToUser(users as User[], posts);
      expect(result).toEqual([]);
    });

    it("should return users with no posts when no posts are provided", () => {
      const users: Partial<User>[] = [
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
        },
      ];
      const posts: UserPost[] = [];

      const result = mapUserPostsToUser(users as User[], posts);
      expect(result).toEqual([
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
          posts: undefined,
        },
      ]);
    });

    it("should map posts to the correct user", () => {
      const users: Partial<User>[] = [
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
        },
      ];
      const posts: UserPost[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1", comments: [] },
      ];

      const result = mapUserPostsToUser(users as User[], posts);
      expect(result).toEqual([
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
          posts: [
            { userId: 1, id: 1, title: "Post 1", body: "Body 1", comments: [] },
          ],
        },
      ]);
    });

    it("should not assign posts when userId does not match any user", () => {
      const users: Partial<User>[] = [
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
        },
      ];
      const posts: UserPost[] = [
        { userId: 2, id: 1, title: "Post 1", body: "Body 1", comments: [] },
      ];

      const result = mapUserPostsToUser(users as User[], posts);
      expect(result).toEqual([
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
          posts: undefined,
        },
      ]);
    });

    it("should handle multiple users with mixed post assignments", () => {
      const users: Partial<User>[] = [
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
        },
        {
          id: 2,
          name: "User 2",
          username: "user2",
          email: "user2@example.com",
          phone: "456",
          website: "user2.com",
        },
      ];
      const posts: UserPost[] = [
        { userId: 1, id: 1, title: "Post 1", body: "Body 1", comments: [] },
        { userId: 2, id: 2, title: "Post 2", body: "Body 2", comments: [] },
      ];

      const result = mapUserPostsToUser(users as User[], posts);
      expect(result).toEqual([
        {
          id: 1,
          name: "User 1",
          username: "user1",
          email: "user1@example.com",
          phone: "123",
          website: "user1.com",
          posts: [
            { userId: 1, id: 1, title: "Post 1", body: "Body 1", comments: [] },
          ],
        },
        {
          id: 2,
          name: "User 2",
          username: "user2",
          email: "user2@example.com",
          phone: "456",
          website: "user2.com",
          posts: [
            { userId: 2, id: 2, title: "Post 2", body: "Body 2", comments: [] },
          ],
        },
      ]);
    });
  });
});
