import React from 'react';

export function EmployeeList({ employees, onView, onEdit, onDelete }) {
  if (!employees || employees.length === 0) {
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
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.company || ''}</td>
            <td>{emp.location || ''}</td>
            <td>{emp.role || ''}</td>
            <td className="actions">
              <button onClick={() => onView(emp.id)}>View</button>
              <button onClick={() => onEdit(emp.id)}>Edit</button>
              <button onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

