import { Post, User } from "../../api/api.types";
import { UserPostList } from "./components";

const MOCKED_POSTS: Post[] = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

interface UserDetailsProps {
  data: User;
}

export function UserDetails({ data }: UserDetailsProps) {
  const { id } = data;
  const posts = MOCKED_POSTS;

  const handleAddPost = () => {
    alert("handleAddPost");
  };

  return (
    <div style={{ padding: 8, backgroundColor: "green" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>User - {id}</h2>
        <button onClick={handleAddPost}>Add</button>
      </div>
      <div>
        <UserPostList data={posts} />
      </div>
    </div>
  );
}
