import React, { useState } from "react";

export const Parent = () => {
  const [userName, setUserName] = useState("John Doe");

  return (
    <div>
      {userName}
      <Child setUserName={setUserName} />
    </div>
  );
};

export const Child = ({ setUserName }) => {
  return <Grandchild setUserName={setUserName} />;
};

export const Grandchild = ({ setUserName }) => {
  return (
    <div>
      <button onClick={() => setUserName("Jane Doe")}>Change Name</button>
    </div>
  );
};
