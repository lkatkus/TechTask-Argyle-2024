import { Comment } from "../../../api/api.types";
import { DataModal, UserAvatar } from "../../../components";
import { useModal } from "../../../hooks";

interface UserPostCommentProps {
  data: Comment;
}

export function UserPostComment({ data }: UserPostCommentProps) {
  const { name, body } = data;

  const { Modal: CommentDetailsModal, showModal: showCommentDetailsModal } =
    useModal(<DataModal data={data} />, { label: "Comment details" });

  return (
    <>
      <div
        className="p-2 hover:bg-slate-300 hover:cursor-pointer rounded"
        onClick={showCommentDetailsModal}
      >
        <div className="mb-2 flex gap-2 items-center">
          <UserAvatar name={name} />
          <p className="text-sm text-slate-700">{name}</p>
        </div>
        <div className="p-2 bg-slate-200 border-t-2 border-slate-300 rounded-b">
          <p>{body}</p>
        </div>
      </div>
      <CommentDetailsModal />
    </>
  );
}
