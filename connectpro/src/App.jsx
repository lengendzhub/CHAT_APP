import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.jsx';
import EmployeeList from './components/EmployeeList.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';

const STORAGE_KEY = 'employees';

function loadEmployees() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveEmployees(employees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    setEmployees(loadEmployees());
  }, []);

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) => (e.name || '').toLowerCase().includes(q));
  }, [employees, search]);

  const handleOpenNew = useCallback(() => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  }, []);

  const handleView = useCallback((emp) => {
    if (!emp) return;
    alert(`Name: ${emp.name}\nCompany: ${emp.company || ''}\nLocation: ${emp.location || ''}\nRole: ${emp.role || ''}\nEmail: ${emp.email || ''}\nPhone: ${emp.phone || ''}\nDetails: ${emp.details || ''}`);
  }, []);

  const handleEdit = useCallback((emp) => {
    setEditingEmployee(emp);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    if (!window.confirm('Delete this employee?')) return;
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleSave = useCallback((emp) => {
    setEmployees((prev) => {
      const exists = prev.some((e) => e.id === emp.id);
      if (exists) {
        return prev.map((e) => (e.id === emp.id ? emp : e));
      }
      return [...prev, emp];
    });
    setIsFormOpen(false);
    setEditingEmployee(null);
  }, []);

  return (
    <div className="emp-page">
      <div className="emp-container">
        <h1 className="emp-title">Employee Directory (India - All Companies)</h1>
        <SearchBar value={search} onChange={setSearch} onAdd={handleOpenNew} />
        <EmployeeList
          employees={filtered}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <EmployeeForm
        isOpen={isFormOpen}
        initialData={editingEmployee}
        onSave={handleSave}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}