import { Comment } from "../../../api/api.types";
import { DataModal } from "../../../components";
import { useModal } from "../../../hooks";

interface UserPostCommentProps {
  data: Comment;
}

export function UserPostComment({ data }: UserPostCommentProps) {
  const { name, body } = data;

  const { Modal: CommentDetailsModal, showModal: showCommentDetailsModal } =
    useModal(<DataModal data={data} />);

  return (
    <>
      <div
        className="p-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
        onClick={showCommentDetailsModal}
      >
        <div className="mb-1">
          <p className="text-sm text-gray-500">
            by <span className="font-semibold">{name}</span>
          </p>
        </div>
        <div>
          <p>{body}</p>
        </div>
      </div>
      <CommentDetailsModal />
    </>
  );
}
