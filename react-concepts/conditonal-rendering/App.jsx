import React from "react";

export default function App() {
  const [unreadMessages, setUnreadMessages] = React.useState([
    "Hello!",
    "How are you?",
    "Goodbye!",
  ]);

  return (
    <div>
      {unreadMessages.length > 0 && (
        <h1>You have {unreadMessages.length} unread messages!</h1>
      )}
    </div>
  );
}
