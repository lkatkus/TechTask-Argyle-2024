import { PostComment } from "../../../api/api.types";

interface UserPostCommentProps {
  data: PostComment;
}

export function UserPostComment({ data }: UserPostCommentProps) {
  const { email, body } = data;

  const handleDisplayCommentDetails = () => {
    alert(JSON.stringify(data));
  };

  return (
    <div
      style={{ padding: 8, backgroundColor: "lime" }}
      onClick={handleDisplayCommentDetails}
    >
      <div>{email}</div>
      <div>{body}</div>
    </div>
  );
}
