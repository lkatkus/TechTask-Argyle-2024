import { NewPost } from "../../../api/api.types";

interface UserAddPostModalProps {
  isLoading: boolean;
  handleAddPost: (newPost: NewPost) => void;
}

export function UserAddPostModal({
  isLoading,

  handleAddPost,
}: UserAddPostModalProps) {
  const handleSubmitForm = () => {
    handleAddPost({ title: "foo", body: "bar", userId: 1 });
  };

  return (
    <div>
      <div>Add post for user</div>
      <div>
        <button disabled={isLoading} onClick={handleSubmitForm}>
          Add
        </button>
      </div>
    </div>
  );
}
