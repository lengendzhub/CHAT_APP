import React from 'react';

export default function SearchBar({ query, onQueryChange, onAdd }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button onClick={onAdd}>Add Employee</button>
    </div>
  );
}

