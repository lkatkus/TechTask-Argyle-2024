import { Post, PostComment } from "../../../api/api.types";
import { UserPostComment } from "./UserPostComment";

const MOCKED_COMMENTS = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
];

interface UserPostDetailsProps {
  data: Post;
}

export function UserPostDetails({ data }: UserPostDetailsProps) {
  const { title } = data;
  const comments: PostComment[] = MOCKED_COMMENTS;

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
