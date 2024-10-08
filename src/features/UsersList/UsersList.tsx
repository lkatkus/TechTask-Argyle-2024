import { useContext, useEffect, useState } from "react";
import { useUsersQuery } from "../../api/api";
import { UserDetails } from "../../containers/UserDetails";
import { SearchContext } from "../../store/SearchContext";
import { User } from "../../api/api.types";

export function UsersList() {
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [displayedUsersFilter, setDisplayedUsersFilter] = useState("");

  const { data, isLoading } = useUsersQuery();
  const { search } = useContext(SearchContext);

  useEffect(() => {
    if (data) {
      let users: User[];

      if (displayedUsersFilter) {
        users = data.filter(({ username }) => {
          return username
            .toLowerCase()
            .includes(displayedUsersFilter.toLowerCase());
        });
      } else {
        users = data;
      }

      setDisplayedUsers(users);
    }
  }, [data, displayedUsersFilter]);

  useEffect(() => {
    if (displayedUsersFilter !== search) {
      setDisplayedUsersFilter(search);
    }
  }, [displayedUsersFilter, search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Missing users data.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-16">
      {displayedUsers.length > 0 ? (
        displayedUsers.map((user) => {
          return <UserDetails key={user.id} data={user} />;
        })
      ) : (
        <div>No users data available.</div>
      )}
    </div>
  );
}
