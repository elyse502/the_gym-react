import MainComponent from "./components/MainComponent";
import LoginContextProvider from "./context/LoginContextProvider";

const App = () => {
  return (
    <LoginContextProvider>
      <MainComponent />
    </LoginContextProvider>
  );
};

export default App;
