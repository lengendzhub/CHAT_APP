import React from 'react';

export function SearchBar({ value, onChange, onAdd }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onAdd}>Add Employee</button>
    </div>
  );
}

