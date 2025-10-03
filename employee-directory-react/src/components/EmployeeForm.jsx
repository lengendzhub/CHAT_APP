import React, { useEffect, useState } from 'react';

export default function EmployeeForm({ open, onClose, initialData, onSave }) {
  const [form, setForm] = useState({
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
    if (initialData) {
      setForm({ ...initialData });
    } else {
      setForm({
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
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = form.id ? Number(form.id) : Date.now();
    onSave({ ...form, id });
  };

  return (
    <div className={`modal ${open ? '' : 'hidden'}`}>
      <div className="modal-content">
        <h2>{form.id ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={form.id} />

          <label>
            Name
            <input name="name" required value={form.name} onChange={handleChange} />
          </label>
          <br />

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <br />

          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} />
          </label>
          <br />

          <label>
            Company
            <input name="company" value={form.company} onChange={handleChange} />
          </label>
          <br />

          <label>
            Location
            <input name="location" value={form.location} onChange={handleChange} />
          </label>
          <br />

          <label>
            Role
            <input name="role" value={form.role} onChange={handleChange} />
          </label>
          <br />

          <label>
            Details
            <textarea name="details" value={form.details} onChange={handleChange} />
          </label>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

