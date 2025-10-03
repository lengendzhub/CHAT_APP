import React, { useEffect, useState } from 'react';

export function EmployeeForm({ isOpen, initialEmployee, onCancel, onSubmit }) {
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    role: '',
    details: '',
  });

  useEffect(() => {
    if (initialEmployee) {
      setFormState({
        id: initialEmployee.id,
        name: initialEmployee.name || '',
        email: initialEmployee.email || '',
        phone: initialEmployee.phone || '',
        company: initialEmployee.company || '',
        location: initialEmployee.location || '',
        role: initialEmployee.role || '',
        details: initialEmployee.details || '',
      });
    } else {
      setFormState({
        id: '',
        name: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        role: '',
        details: '',
      });
    }
  }, [initialEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = formState.id ? Number(formState.id) : Date.now();
    onSubmit({ ...formState, id });
  };

  return (
    <div className={`modal ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-content">
        <h2>{formState.id ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formState.id} />

          <label>
            Name
            <input name="name" value={formState.name} onChange={handleChange} required />
          </label>
          <br />

          <label>
            Email
            <input name="email" type="email" value={formState.email} onChange={handleChange} />
          </label>
          <br />

          <label>
            Phone
            <input name="phone" value={formState.phone} onChange={handleChange} />
          </label>
          <br />

          <label>
            Company
            <input name="company" value={formState.company} onChange={handleChange} />
          </label>
          <br />

          <label>
            Location
            <input name="location" value={formState.location} onChange={handleChange} />
          </label>
          <br />

          <label>
            Role
            <input name="role" value={formState.role} onChange={handleChange} />
          </label>
          <br />

          <label>
            Details
            <textarea name="details" value={formState.details} onChange={handleChange} />
          </label>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

