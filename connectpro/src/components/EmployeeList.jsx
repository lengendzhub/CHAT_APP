import React from 'react';

export default function EmployeeList({ employees, onView, onEdit, onDelete }) {
  if (!employees || employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <table className="emp-table">
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
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.company || ''}</td>
            <td>{emp.location || ''}</td>
            <td>{emp.role || ''}</td>
            <td className="emp-actions">
              <button className="emp-action-btn" onClick={() => onView(emp)}>View</button>
              <button className="emp-action-btn" onClick={() => onEdit(emp)}>Edit</button>
              <button className="emp-action-btn" onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

