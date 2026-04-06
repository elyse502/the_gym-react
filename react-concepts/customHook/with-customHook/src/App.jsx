import useFetch from "./customHooks/useFetch";

const App = () => {
  const data = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 p-6 border rounded-md bg-gray-400 space-y-3">
        <h1 className="text-lg font-semibold text-center">
          Users List (with Custom Hook)
        </h1>

        {data.length === 0 ? (
          <p className="text-sm text-center text-gray-500">Loading...</p>
        ) : (
          data.map((res) => (
            <div key={res.id} className="p-2 border rounded text-sm">
              <span className="font-medium">{res.id}.</span> {res.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
