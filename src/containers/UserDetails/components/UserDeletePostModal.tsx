import { Button } from "../../../components/Button";

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

      <div className="flex justify-end gap-2">
        <Button variant="secondary" disabled={isLoading} onClick={onDiscard}>
          Cancel
        </Button>
        <Button variant="danger" disabled={isLoading} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
};
