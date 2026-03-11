function UserSelector({ users, selectedUserId, onSelect }) {
  function handleChange(e) {
    onSelect(Number(e.target.value));
  }

  return (
    <select value={selectedUserId || ""} onChange={handleChange}>
      <option value="">Select user</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelector;
