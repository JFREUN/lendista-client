import React from "react";

function AllUsers({ allUsers }) {
  return (
    <div className="componentPage">
      <h3>All Users</h3>
      <table className="productTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="membershipCol">Membership</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="membershipCol">{user.membership}</td>

                <td>{user.credits}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
