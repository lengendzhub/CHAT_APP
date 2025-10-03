import React from 'react';

export default function SearchBar({ value, onChange, onAdd }) {
  return (
    <div className="emp-controls">
      <input
        className="emp-input"
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="emp-button" onClick={onAdd}>Add Employee</button>
    </div>
  );
}

