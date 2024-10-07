import { useUserPostsQuery } from "../../api/api";
import { User } from "../../api/api.types";
import { UserPostList } from "./components";

interface UserDetailsProps {
  data: User;
}

export function UserDetails({ data }: UserDetailsProps) {
  const { id } = data;
  const { data: posts, isLoading } = useUserPostsQuery(id);

  if (isLoading) {
    return <div>LOADING USER DETAILS</div>;
  }

  if (!posts) {
    return <div>Missing user posts data</div>;
  }

  const handleAddPost = () => {
    alert(`handleAddPost ${id}`);
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
