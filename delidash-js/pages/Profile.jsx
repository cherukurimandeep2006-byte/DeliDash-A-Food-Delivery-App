import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import userService from '../src/services/userService';

export const Profile = () => {
  const { user, updateProfile, refreshUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', avatar: '' });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [addrForm, setAddrForm] = useState({ label: '', details: '' });

  useEffect(() => {
    const load = async () => {
      try {
        if (user) {
          setFormData({ name: user.name || '', email: user.email || '', phone: user.phone || '', avatar: user.avatar || '' });
          setAddresses(user.addresses || []);
        } else {
          const resp = await userService.getProfile();
          const data = resp.data || resp.user;
          if (data) {
            setFormData({ name: data.name || '', email: data.email || '', phone: data.phone || '', avatar: data.avatar || '' });
            setAddresses(data.addresses || []);
          }
        }
      } catch (err) {
        // ignore
      }
    };
    load();
  }, [user]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setMessage('Uploading avatar...');
    try {
      const res = await userService.uploadAvatar(file);
      const updated = res.data || res.user;
      setFormData(prev => ({ ...prev, avatar: updated.avatar }));
      setMessage('Avatar uploaded');
      // refresh auth user so navbar/avatar updates
      if (typeof updateProfile === 'function') {
        try { await updateProfile({ avatar: updated.avatar }); } catch (e) { /* ignore */ }
      }
    } catch (err) {
      setMessage(err.message || 'Avatar upload failed');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!formData.name || formData.name.trim().length === 0) return 'Name is required';
    if (formData.phone && !/^[0-9+\-\s]{7,15}$/.test(formData.phone)) return 'Enter a valid phone number';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const err = validate();
    if (err) {
      setMessage(err);
      setLoading(false);
      return;
    }
    try {
      await updateProfile({ name: formData.name, phone: formData.phone, avatar: formData.avatar });
      setMessage('Profile updated successfully');
    } catch (err) {
      setMessage(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddrChange = (e) => setAddrForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const addAddress = async (e) => {
    e.preventDefault();
    if (!addrForm.label || !addrForm.details) return setMessage('Address label and details are required');
    try {
      if (addrForm.id) {
        // edit existing
        const res = await userService.editAddress(addrForm.id, addrForm.label, addrForm.details);
        const updated = res.data || res.user;
        setAddresses(updated.addresses || []);
        setAddrForm({ label: '', details: '' });
        setMessage('Address updated');
        try { await refreshUser(); } catch (e) { /* ignore */ }
      } else {
        const res = await userService.addAddress(addrForm.label, addrForm.details);
        const updated = res.data || res.user;
        setAddresses(updated.addresses || []);
        setAddrForm({ label: '', details: '' });
        setMessage('Address added');
        try { await refreshUser(); } catch (e) { /* ignore */ }
      }
    } catch (err) {
      setMessage(err.message || 'Failed to add/update address');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">{message}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
              {formData.avatar ? (
                <img src={formData.avatar} alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.target.onerror=null; e.target.src='https://via.placeholder.com/150?text=Avatar'; }} />
              ) : (
                <div className="text-2xl font-bold text-gray-600">{(formData.name || 'U').charAt(0).toUpperCase()}</div>
              )}
            </div>
            <label className="text-sm">Upload avatar</label>
            <input type="file" accept="image/*" onChange={onFileChange} className="mt-2" />
            <label className="text-sm mt-3">Or avatar URL</label>
            <input name="avatar" value={formData.avatar} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border border-gray-200 rounded p-2" />
          </div>

          <div className="md:col-span-2">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-200 rounded p-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" value={formData.email} disabled className="mt-1 block w-full border border-gray-200 rounded p-2 bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-200 rounded p-2" />
              </div>

              <div className="flex gap-2">
                <Button type="submit" isLoading={loading}>Save</Button>
                <Button variant="outline" type="button" onClick={() => setFormData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', avatar: user?.avatar || '' })}>Reset</Button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="font-bold mb-4">Saved Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-gray-500 mb-3">No saved addresses</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {addresses.map((a) => (
              <li key={a.id} className="p-3 border rounded flex justify-between items-start">
                <div>
                  <strong>{a.label}</strong>
                  <div className="text-sm text-gray-600">{a.details}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setAddrForm({ label: a.label, details: a.details, id: a.id }); setMessage('Editing address'); }} className="text-sm text-brand-600 hover:underline">Edit</button>
                  <button onClick={async () => {
                    try {
                      const res = await userService.deleteAddress(a.id);
                      const updated = res.data || res.user;
                      setAddresses(updated.addresses || []);
                      setMessage('Address removed');
                      try { await refreshUser(); } catch (e) { /* ignore */ }
                    } catch (err) { setMessage(err.message || 'Failed to remove address'); }
                  }} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={addAddress} className="space-y-3">
          <input name="label" value={addrForm.label} onChange={handleAddrChange} placeholder="Home, Work, etc" className="block w-full border border-gray-200 rounded p-2" />
          <input name="details" value={addrForm.details} onChange={handleAddrChange} placeholder="Address details" className="block w-full border border-gray-200 rounded p-2" />
          <div className="flex gap-2">
            <Button type="submit">{addrForm.id ? 'Save Address' : 'Add Address'}</Button>
            <Button variant="outline" type="button" onClick={() => setAddrForm({ label: '', details: '' })}>Reset</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
