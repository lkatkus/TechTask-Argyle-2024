import { Header, UsersList } from "./features";

function App() {
  return (
    <div className="grid grid-rows-[min-content_1fr] pb-4 text-slate-800">
      <div className="sticky top-0 bg-slate-300 shadow-lg">
        <div className="container mx-auto ">
          <Header />
        </div>
      </div>

      <div className="bg-slate-400">
        <div className="py-4 container mx-auto">
          <UsersList />
        </div>
      </div>
    </div>
  );
}

export default App;
