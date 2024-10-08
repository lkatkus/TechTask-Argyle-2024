import { Header, UsersList } from "./features";

function App() {
  return (
    <div className="grid grid-rows-[min-content_1fr] gap-4">
      <div className="sticky top-0 bg-slate-200">
        <div className="container mx-auto">
          <Header />
        </div>
      </div>

      <div>
        <div className="container mx-auto">
          <UsersList />
        </div>
      </div>
    </div>
  );
}

export default App;
