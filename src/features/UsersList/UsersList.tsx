import { useUsersQuery } from "../../api/api";
import { UserDetails } from "../../containers/UserDetails";

export function UsersList() {
  const { data, isLoading } = useUsersQuery();

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  if (!data) {
    return <div>Missing users data</div>;
  }

  return (
    <div style={{ padding: 8, backgroundColor: "yellow" }}>
      <div>
        {data.map((user) => {
          return <UserDetails key={user.id} data={user} />;
        })}
      </div>
    </div>
  );
}
