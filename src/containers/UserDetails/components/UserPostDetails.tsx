import { useDeletePostMutation } from "../../../api/api";
import { UserPost } from "../../../api/api.types";
import { Accordion, Button } from "../../../components";
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
    mutate(id, {
      onSuccess() {
        hideModal();
      },
    });
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
    />,
    { label: "Delete a post" }
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

        <div className="p-4 border-t-4 border-slate-200 bg-gray-100 rounded-b">
          <div className="p-0 md:p-2 mb-4">
            <p>{body}</p>
          </div>
          <div>
            {comments.length > 0 ? (
              <Accordion label={`Comments (${comments.length})`}>
                <div className="grid grid-cols-1 gap-2">
                  {comments.map((comment) => {
                    return <UserPostComment key={comment.id} data={comment} />;
                  })}
                </div>
              </Accordion>
            ) : (
              <div>
                <p className="text-sm font-semibold">
                  This post does not have any comments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmPostDeleteModal />
    </>
  );
}
