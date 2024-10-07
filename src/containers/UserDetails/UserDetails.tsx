import { useEffect, useState } from "react";
import { useAddPostMutation, useUserPostsQuery } from "../../api/api";
import { Post, User } from "../../api/api.types";
import { UserPostDetails } from "./components";

interface UserDetailsProps {
  data: User;
}

export function UserDetails({ data }: UserDetailsProps) {
  const { id } = data;

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [deletedPosts, setDeletedPosts] = useState<number[]>([]);

  const handleAddPost = () => {
    mutate({ title: "foo", body: "bar", userId: 1 });
  };

  const handleOnAddUserPost = (createdPostData: Post) => {
    const newCreatedPostId = Math.floor(Math.random() * 1000 + 100);
    const createdPost = { ...createdPostData, id: newCreatedPostId };

    setDisplayedPosts((v) => [...v, createdPost]);
  };

  const handleOnDeleteUserPost = (deletedPostId: number) => {
    setDeletedPosts((v) => [...v, deletedPostId]);
  };

  const { data: posts, isLoading } = useUserPostsQuery(id);
  const { mutate, isPending } = useAddPostMutation(handleOnAddUserPost);

  useEffect(() => {
    if (posts) {
      setDisplayedPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (deletedPosts.length > 0) {
      setDisplayedPosts((v) =>
        v.filter(({ id }) => !deletedPosts.includes(id))
      );
    }
  }, [deletedPosts]);

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  if (!displayedPosts) {
    return <div>Missing user posts data.</div>;
  }

  return (
    <div style={{ padding: 8, backgroundColor: isPending ? "red" : "green" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>User - {id}</h2>
        <button disabled={isPending} onClick={handleAddPost}>
          Add
        </button>
      </div>
      <div style={{ padding: 8, backgroundColor: "blue" }}>
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => {
            return (
              <UserPostDetails
                key={post.id}
                data={post}
                onDeleteUserPost={handleOnDeleteUserPost}
              />
            );
          })
        ) : (
          <div>This user does not have any posts.</div>
        )}
      </div>
    </div>
  );
}
