import { useEffect, useState } from "react";
import { useAddPostMutation, useUserPostsQuery } from "../../api/api";
import { NewPost, Post, User } from "../../api/api.types";
import { UserAddPostModal, UserPostDetails } from "./components";
import { useModal } from "../../hooks";

interface UserDetailsProps {
  data: User;
}

export function UserDetails({ data }: UserDetailsProps) {
  const { id } = data;

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [deletedPosts, setDeletedPosts] = useState<number[]>([]);

  const handleAddPost = (newPostData: NewPost) => {
    mutate(newPostData);
  };

  const handleDiscardAppPost = () => {
    hideModal();
  };

  const handleOnAddUserPost = (createdPostData: Post) => {
    hideModal();

    const newCreatedPostId = Math.floor(Math.random() * 1000 + 100);
    const createdPost = { ...createdPostData, id: newCreatedPostId };

    setDisplayedPosts((v) => [...v, createdPost]);
  };

  const handleOnDeleteUserPost = (deletedPostId: number) => {
    setDeletedPosts((v) => [...v, deletedPostId]);
  };

  const { data: posts, isLoading } = useUserPostsQuery(id);
  const { mutate, isPending } = useAddPostMutation(handleOnAddUserPost);
  const { Modal, showModal, hideModal } = useModal(
    <UserAddPostModal
      isLoading={isPending}
      user={data}
      onConfirm={handleAddPost}
      onDiscard={handleDiscardAppPost}
    />
  );

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
    <>
      <div style={{ padding: 8, backgroundColor: "green" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>User - {id}</h2>
          <button onClick={showModal}>Add</button>
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
      <Modal />
    </>
  );
}
