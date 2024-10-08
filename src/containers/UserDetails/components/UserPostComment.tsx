import { PostComment } from "../../../api/api.types";
import { useModal } from "../../../hooks";

interface UserPostCommentProps {
  data: PostComment;
}

export function UserPostComment({ data }: UserPostCommentProps) {
  const { name, email, body } = data;

  const { Modal, showModal } = useModal(<div>{JSON.stringify(data)}</div>);

  return (
    <>
      <div
        className="p-2 bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
        onClick={showModal}
      >
        <div className="mb-1">
          <p className="text-sm text-gray-500">
            by {name} ({email})
          </p>
        </div>
        <div>
          <p>{body}</p>
        </div>
      </div>
      <Modal />
    </>
  );
}
