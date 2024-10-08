import { useUsersQuery } from "../../api/api";
import { UserDetails } from "../../containers/UserDetails";

export function UsersList() {
  const { data, isLoading } = useUsersQuery();

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  if (!data) {
    return <div>Missing users data.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {data.map((user) => {
        return <UserDetails key={user.id} data={user} />;
      })}
    </div>
  );
}
