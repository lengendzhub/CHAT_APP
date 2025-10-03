import React from 'react';

export default function EmployeeList({ employees, onView, onEdit, onDelete }) {
  if (!employees.length) {
    return <p>No employees found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Location</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.company || ''}</td>
            <td>{e.location || ''}</td>
            <td>{e.role || ''}</td>
            <td className="actions">
              <button onClick={() => onView(e)}>View</button>
              <button onClick={() => onEdit(e)}>Edit</button>
              <button onClick={() => onDelete(e)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

