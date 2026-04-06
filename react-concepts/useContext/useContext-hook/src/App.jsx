import { createContext } from "react";
import MainComponet from "./components/MainComponet";

export const LoginContext = createContext();

const App = () => {
  return (
    <LoginContext.Provider value={true}>
      <div>
        <MainComponet />
      </div>
    </LoginContext.Provider>
  );
};

export default App;
