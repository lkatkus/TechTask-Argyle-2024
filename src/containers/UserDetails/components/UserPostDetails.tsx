import {
  useDeletePostMutation,
  useUserPostCommentsQuery,
} from "../../../api/api";
import { Post } from "../../../api/api.types";
import { useModal } from "../../../hooks";
import { UserDeletePostModal } from "./UserDeletePostModal";
import { UserPostComment } from "./UserPostComment";

interface UserPostDetailsProps {
  data: Post;
  onDeleteUserPost: (deletedPostId: number) => void;
}

export function UserPostDetails({
  data,
  onDeleteUserPost,
}: UserPostDetailsProps) {
  const { id, title, body } = data;

  const handleDeletePost = () => {
    mutate(id);
  };

  const handleDiscardDeletePost = () => {
    hideModal();
  };

  const { data: comments, isLoading } = useUserPostCommentsQuery(id);
  const { mutate, isPending } = useDeletePostMutation(onDeleteUserPost);
  const {
    Modal: ConfirmPostDeleteModal,
    showModal,
    hideModal,
  } = useModal(
    <UserDeletePostModal
      isLoading={isPending}
      onDiscard={handleDiscardDeletePost}
      onConfirm={handleDeletePost}
    />
  );

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  if (!comments) {
    return <div>Missing user post comments data.</div>;
  }

  return (
    <>
      <div style={{ padding: 8, backgroundColor: isPending ? "red" : "grey" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>{title}</h4>
          <button disabled={isPending} onClick={showModal}>
            Delete
          </button>
        </div>

        <div style={{ color: "lime" }}>
          <p>{body}</p>
        </div>

        <div>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return <UserPostComment key={comment.id} data={comment} />;
            })
          ) : (
            <div>This post does not have any comments.</div>
          )}
        </div>
      </div>

      <ConfirmPostDeleteModal />
    </>
  );
}
