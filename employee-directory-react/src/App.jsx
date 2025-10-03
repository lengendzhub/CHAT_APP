import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import SearchBar from './components/SearchBar.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';

const STORAGE_KEY = 'employees';

function readEmployeesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeEmployeesToStorage(employees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export default function App() {
  const [employees, setEmployees] = useState(() => readEmployeesFromStorage());
  const [query, setQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    writeEmployeesToStorage(employees);
  }, [employees]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) => e.name?.toLowerCase().includes(q));
  }, [employees, query]);

  const handleAdd = () => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const handleSave = (emp) => {
    setEmployees((prev) => {
      const exists = prev.some((e) => e.id === emp.id);
      return exists ? prev.map((e) => (e.id === emp.id ? emp : e)) : [...prev, emp];
    });
    setIsFormOpen(false);
    setEditing(null);
  };

  const handleView = (emp) => {
    alert(
      `Name: ${emp.name}\nCompany: ${emp.company || ''}\nLocation: ${emp.location || ''}\nRole: ${emp.role || ''}\nEmail: ${emp.email || ''}\nPhone: ${emp.phone || ''}\nDetails: ${emp.details || ''}`
    );
  };

  const handleEdit = (emp) => {
    setEditing(emp);
    setIsFormOpen(true);
  };

  const handleDelete = (emp) => {
    if (!confirm('Delete this employee?')) return;
    setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
  };

  return (
    <div className="container">
      <h1>Employee Directory (India - All Companies)</h1>

      <SearchBar query={query} onQueryChange={setQuery} onAdd={handleAdd} />

      <div>
        <EmployeeList
          employees={filtered}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <EmployeeForm
        open={isFormOpen}
        initialData={editing}
        onSave={handleSave}
        onClose={() => {
          setIsFormOpen(false);
          setEditing(null);
        }}
      />
    </div>
  );
}

