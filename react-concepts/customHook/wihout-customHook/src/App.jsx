import { useEffect, useState } from "react";

const App = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setResponses(data));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 p-6 border rounded-md bg-gray-400 space-y-3">
        <h1 className="text-lg font-semibold text-center">Users List</h1>

        {responses.length === 0 ? (
          <p className="text-sm text-center text-gray-500">Loading...</p>
        ) : (
          responses.map((res) => (
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
