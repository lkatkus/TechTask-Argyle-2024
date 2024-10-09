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
    <div className="py-4 grid gap-4 grid-cols-[min-content_1fr] md:grid-cols-2 px-4 md:px-0 items-center">
      <div className="text-3xl font-bold uppercase">
        <h1 className="hidden md:block">Commentator 9000</h1>

        <h1 className="md:hidden">C9K</h1>
      </div>

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
