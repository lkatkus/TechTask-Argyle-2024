interface UserDeletePostModalProps {
  isLoading: boolean;
  onConfirm: () => void;
  onDiscard: () => void;
}

export const UserDeletePostModal = ({
  isLoading,
  onConfirm,
  onDiscard,
}: UserDeletePostModalProps) => {
  return (
    <div>
      <div>Are your sure you want to delete this post?</div>
      <button disabled={isLoading} onClick={onDiscard}>
        Cancel
      </button>
      <button disabled={isLoading} onClick={onConfirm}>
        Delete
      </button>
    </div>
  );
};
