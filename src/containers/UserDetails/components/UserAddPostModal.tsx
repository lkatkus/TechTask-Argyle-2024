import { useForm, SubmitHandler } from "react-hook-form";
import { NewPost, User } from "../../../api/api.types";
import { Button, TextInput } from "../../../components";

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
      body: data.body,
      userId: user.id,
    };

    onConfirm(formPayload);
  };

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <TextInput
            name="title"
            label="Title"
            placeholder="Enter title"
            error={errors.title ? errors.title.message : undefined}
            controllerProps={register("title", {
              required: "This field is required",
            })}
          />
        </div>

        <div>
          <TextInput
            rows={3}
            name="body"
            label="Content"
            placeholder="Enter content"
            error={errors.body ? errors.body.message : undefined}
            controllerProps={register("body", {
              required: "This field is required",
            })}
          />
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
