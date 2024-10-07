import {
  useDeletePostMutation,
  useUserPostCommentsQuery,
} from "../../../api/api";
import { Post } from "../../../api/api.types";
import { UserPostComment } from "./UserPostComment";

interface UserPostDetailsProps {
  data: Post;
  onDeleteUserPost: (deletedPostId: number) => void;
}

export function UserPostDetails({
  data,
  onDeleteUserPost,
}: UserPostDetailsProps) {
  const { id, title } = data;

  const { data: comments, isLoading } = useUserPostCommentsQuery(id);
  const { mutate, isPending } = useDeletePostMutation(onDeleteUserPost);

  if (isLoading) {
    return <div>LOADING USER DETAILS</div>;
  }

  if (!comments) {
    return <div>Missing user post comments data</div>;
  }

  const handleDeletePost = () => {
    mutate(id);
  };

  return (
    <div style={{ padding: 8, backgroundColor: isPending ? "red" : "grey" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>
          {id} - {title}
        </h4>
        <button onClick={handleDeletePost}>Delete</button>
      </div>
      <div>
        {comments.map((comment) => {
          return <UserPostComment key={comment.id} data={comment} />;
        })}
      </div>
    </div>
  );
}
