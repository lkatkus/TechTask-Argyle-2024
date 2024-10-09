import { ChangeEventHandler, useContext } from "react";
import { useForm } from "react-hook-form";
import { SearchContext } from "../../store/SearchContext";
import { useFullUsersDataQuery } from "../../api/api";
import { TextInput } from "../../components";
import { debounce } from "../../utils";

type SearchInputs = {
  search: string;
};

export function Header() {
  const searchContextValue = useContext(SearchContext);
  const { isLoading } = useFullUsersDataQuery();
  const { register } = useForm<SearchInputs>({
    defaultValues: { search: searchContextValue.search },
  });

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSearchValue = e.target.value;

    searchContextValue.actions.updateSearchString(newSearchValue);
  };

  return (
    <div className="py-4 grid grid-cols-2 gap-4">
      <h1 className="text-3xl font-bold">Commentator 9000</h1>
      <div>
        <TextInput
          name="search"
          placeholder="Search..."
          controllerProps={register("search", {
            onChange: debounce(handleSearchChange),
            disabled: isLoading,
          })}
        />
      </div>
    </div>
  );
}
