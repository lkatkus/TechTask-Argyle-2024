import { useUserPostCommentsQuery } from "../../../api/api";
import { Post } from "../../../api/api.types";
import { UserPostComment } from "./UserPostComment";

interface UserPostDetailsProps {
  data: Post;
}

export function UserPostDetails({ data }: UserPostDetailsProps) {
  const { id, title } = data;
  const { data: comments, isLoading } = useUserPostCommentsQuery(id);

  if (isLoading) {
    return <div>LOADING USER DETAILS</div>;
  }

  if (!comments) {
    return <div>Missing user post comments data</div>;
  }

  const handleDeletePost = () => {
    alert("handleDeletePost");
  };

  return (
    <div style={{ padding: 8, backgroundColor: "grey" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>{title}</h4>
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
