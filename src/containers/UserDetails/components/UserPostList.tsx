import { useEffect, useState } from "react";
import { Post } from "../../../api/api.types";
import { UserPostDetails } from "./UserPostDetails";

interface UserPostListProps {
  data: Post[];
}

export function UserPostList({ data }: UserPostListProps) {
  // To handled mocked deletion flow
  const [filteredUserPosts, setFilteredUsersPosts] = useState(data);
  const [deletedPosts, setDeletedPosts] = useState<number[]>([]);

  const handleOnDeleteUserPost = (deletedPostId: number) => {
    setDeletedPosts((v) => [...v, deletedPostId]);
  };

  useEffect(() => {
    if (deletedPosts.length > 0) {
      setFilteredUsersPosts((v) =>
        v.filter(({ id }) => !deletedPosts.includes(id))
      );
    }
  }, [deletedPosts]);

  return (
    <div style={{ padding: 8, backgroundColor: "blue" }}>
      {filteredUserPosts.length > 0 ? (
        filteredUserPosts.map((post) => {
          return (
            <UserPostDetails
              key={post.id}
              data={post}
              onDeleteUserPost={handleOnDeleteUserPost}
            />
          );
        })
      ) : (
        <div>User has no posts</div>
      )}
    </div>
  );
}
