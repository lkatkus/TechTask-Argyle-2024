import { Post } from "../../../api/api.types";
import { UserPostDetails } from "./UserPostDetails";

interface UserPostListProps {
  data: Post[];
}

export function UserPostList({ data }: UserPostListProps) {
  return (
    <div style={{ padding: 8, backgroundColor: "blue" }}>
      {data.map((post) => {
        return <UserPostDetails key={post.id} data={post} />;
      })}
    </div>
  );
}
