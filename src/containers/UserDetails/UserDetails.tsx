import { useEffect, useState } from "react";
import { useAddPostMutation } from "../../api/api";
import { NewPost, UserPost, UserWithPosts, Post } from "../../api/api.types";
import { UserAddPostModal, UserPostDetails } from "./components";
import { useModal } from "../../hooks";
import { Button, DataModal } from "../../components";

interface UserDetailsProps {
  data: UserWithPosts;
}

export function UserDetails({ data }: UserDetailsProps) {
  const { username, posts } = data;

  const [displayedPosts, setDisplayedPosts] = useState<UserPost[]>([]);
  const [deletedPosts, setDeletedPosts] = useState<number[]>([]);

  const handleAddPost = (newPostData: NewPost) => {
    mutateAddPost(newPostData);
  };

  const handleDiscardAppPost = () => {
    hidePostFormModal();
  };

  const handleOnAddUserPost = (createdPostData: Post) => {
    hidePostFormModal();

    const newCreatedPostId = Math.floor(Math.random() * 1000 + 100);
    const createdPost: UserPost = {
      ...createdPostData,
      id: newCreatedPostId,
      comments: [],
    };

    setDisplayedPosts((v) => [...v, createdPost]);
  };

  const handleOnDeleteUserPost = (deletedPostId: number) => {
    setDeletedPosts((v) => [...v, deletedPostId]);
  };

  const { mutate: mutateAddPost, isPending } =
    useAddPostMutation(handleOnAddUserPost);
  const {
    Modal: PostFormModal,
    showModal: showPostFormModal,
    hideModal: hidePostFormModal,
  } = useModal(
    <UserAddPostModal
      isLoading={isPending}
      user={data}
      onConfirm={handleAddPost}
      onDiscard={handleDiscardAppPost}
    />
  );
  const { Modal: UserDetailsModal, showModal: showUserDetailsModal } = useModal(
    <DataModal data={data} />
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

  if (!displayedPosts) {
    return <div>Missing user posts data.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between">
          <h3
            className="text-xl font-bold hover:cursor-pointer hover:text-blue-500"
            onClick={showUserDetailsModal}
          >
            Posts by {username} ({displayedPosts.length})
          </h3>
          <Button onClick={showPostFormModal}>Add a post</Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
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

      <PostFormModal />
      <UserDetailsModal />
    </>
  );
}
