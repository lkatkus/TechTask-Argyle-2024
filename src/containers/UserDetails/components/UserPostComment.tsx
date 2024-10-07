import { PostComment } from "../../../api/api.types";

interface UserPostCommentProps {
  data: PostComment;
}

export function UserPostComment({ data }: UserPostCommentProps) {
  const { email, body } = data;

  return (
    <div style={{ padding: 8, backgroundColor: "lime" }}>
      <div>{email}</div>
      <div>{body}</div>
    </div>
  );
}
