import React, { useEffect, useState } from 'react';

export default function EmployeeForm({ isOpen, initialData, onSave, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setEmail(initialData?.email || '');
      setPhone(initialData?.phone || '');
      setCompany(initialData?.company || '');
      setLocation(initialData?.location || '');
      setRole(initialData?.role || '');
      setDetails(initialData?.details || '');
    }
  }, [isOpen, initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const payload = {
      id: initialData?.id ?? Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      location: location.trim(),
      role: role.trim(),
      details: details.trim(),
    };
    onSave(payload);
  }

  return (
    <div className={`emp-modal ${isOpen ? '' : 'hidden'}`}>
      <div className="emp-modal-content">
        <h2>{initialData ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input className="emp-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <br />
          <label>
            Email
            <input className="emp-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Phone
            <input className="emp-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <br />
          <label>
            Company
            <input className="emp-input" value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <br />
          <label>
            Location
            <input className="emp-input" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <br />
          <label>
            Role
            <input className="emp-input" value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <br />
          <label>
            Details
            <textarea className="emp-textarea" value={details} onChange={(e) => setDetails(e.target.value)} />
          </label>
          <div className="emp-form-actions">
            <button type="submit" className="emp-button">Save</button>
            <button type="button" className="emp-button emp-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

