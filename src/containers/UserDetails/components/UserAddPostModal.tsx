import { useForm, SubmitHandler } from "react-hook-form";
import { NewPost, User } from "../../../api/api.types";
import { Button } from "../../../components/Button";

type Inputs = {
  title: string;
  body: string;
};

interface UserAddPostModalProps {
  isLoading: boolean;
  user: User;
  onConfirm: (newPost: NewPost) => void;
  onDiscard: () => void;
}

export function UserAddPostModal({
  isLoading,
  user,
  onConfirm,
  onDiscard,
}: UserAddPostModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formPayload = {
      title: data.title,
      body: data.title,
      userId: user.id,
    };

    onConfirm(formPayload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Enter title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
        </div>

        <div>
          <textarea
            rows={5}
            placeholder="Enter content"
            {...register("body", { required: true })}
          />
          {errors.body && <span>This field is required</span>}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" disabled={isLoading} onClick={onDiscard}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
