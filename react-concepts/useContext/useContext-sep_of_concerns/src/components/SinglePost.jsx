import { useContext } from "react";
import { LoginContext } from "../context/LoginContextProvider";

const SinglePost = () => {
  const login = useContext(LoginContext);
  console.log(login);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-80 p-6 border rounded-md bg-gray-400 text-center space-y-3">
        <h3 className="text-lg font-semibold">Single Post</h3>

        <p className="text-sm">
          Login Status:{" "}
          <span
            className={`font-medium ${
              login ? "text-green-600" : "text-red-500"
            }`}
          >
            {login ? "Logged In" : "Not Logged In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
