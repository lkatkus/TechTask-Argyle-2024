import { useContext, useEffect, useState } from "react";
import { useFullUsersDataQuery } from "../../api/api";
import { UserDetails } from "../../containers/UserDetails";
import { SearchContext } from "../../store/SearchContext";
import { UserWithPosts } from "../../api/api.types";

export function UsersList() {
  const [displayedUsers, setDisplayedUsers] = useState<UserWithPosts[]>([]);
  const [displayedUsersFilter, setDisplayedUsersFilter] = useState("");

  const { data, isLoading } = useFullUsersDataQuery();
  const { search } = useContext(SearchContext);

  useEffect(() => {
    if (data) {
      let users: UserWithPosts[];

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
    return (
      <div className="flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!data) {
    return <div>Missing users data.</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Users ({displayedUsers.length})</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => {
            return <UserDetails key={user.id} data={user} />;
          })
        ) : (
          <div>No users data available.</div>
        )}
      </div>
    </div>
  );
}
