import React from "react";
import Header from "./Header";
import Body from "./Body";

export default function App() {
  const [userName, setUserName] = React.useState("Joe");

  /**
   * Challenge:
   * Raise state up a level and pass it down to both the
   * Header and Body components through props.
   *
   * Data flow:
   * App (state)
   *  ├── Header (props)
   *  └── Body (props)
   * In react data flows down the component tree. It cannot flow up or sideways (siblings).
   * To share state between components, you need to lift the state up to their closest common
   * ancestor (in this case, App) and then pass it down as props.
   */

  return (
    <main>
      <Header userName={userName} />
      <Body userName={userName} />
    </main>
  );
}
