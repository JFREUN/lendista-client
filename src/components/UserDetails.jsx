import React from "react";

function UserDetails({
  name,
  handleName,
  password,
  handlePassword,
  email,
  handleEmail,
}) {
  return (
    <div className="pageWrapper">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleName}
        required
      />
    </div>
  );
}

export default UserDetails;
