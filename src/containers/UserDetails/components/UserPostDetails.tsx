import { useDeletePostMutation } from "../../../api/api";
import { UserPost } from "../../../api/api.types";
import { Button } from "../../../components";
import { useModal } from "../../../hooks";
import { UserDeletePostModal } from "./UserDeletePostModal";
import { UserPostComment } from "./UserPostComment";

interface UserPostDetailsProps {
  data: UserPost;
  onDeleteUserPost: (deletedPostId: number) => void;
}

export function UserPostDetails({
  data,
  onDeleteUserPost,
}: UserPostDetailsProps) {
  const { id, title, comments, body } = data;

  const handleDeletePost = () => {
    mutate(id);
  };

  const handleDiscardDeletePost = () => {
    hideModal();
  };

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

  if (!comments) {
    return <div>Missing user post comments data.</div>;
  }

  return (
    <>
      <div>
        <div className="p-2 flex items-center justify-between gap-4">
          <h4 className="text-lg font-semibold">{title}</h4>
          <Button variant="danger" disabled={isPending} onClick={showModal}>
            Delete
          </Button>
        </div>

        <div className="p-4 border-t-4 border-slate-400 bg-gray-100">
          <div className="p-4 mb-4">
            <p>{body}</p>
          </div>
          <div>
            <div className="mb-2">
              <p className="text-sm">Comments ({comments.length})</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {comments.length > 0 ? (
                comments.map((comment) => {
                  return <UserPostComment key={comment.id} data={comment} />;
                })
              ) : (
                <div>This post does not have any comments.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmPostDeleteModal />
    </>
  );
}
