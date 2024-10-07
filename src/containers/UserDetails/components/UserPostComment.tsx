import { PostComment } from "../../../api/api.types";
import { useModal } from "../../../hooks";

interface UserPostCommentProps {
  data: PostComment;
}

export function UserPostComment({ data }: UserPostCommentProps) {
  const { email, body } = data;

  const { Modal, showModal } = useModal(<div>{JSON.stringify(data)}</div>);

  return (
    <>
      <div
        style={{ padding: 8, backgroundColor: "lime", cursor: "pointer" }}
        onClick={showModal}
      >
        <div>{email}</div>
        <div>{body}</div>
      </div>
      <Modal />
    </>
  );
}
