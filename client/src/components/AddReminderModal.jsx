// components/AddReminderModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../utils/api';
import dayjs from 'dayjs';

Modal.setAppElement('#root');

export default function AddReminderModal({ initial, onClose }) {
  const [form, setForm] = useState({
    recipientName: '',
    recipientEmail: '',
    occasion: '',
    date: dayjs().format('YYYY-MM-DD'),
    note: '',
    notifyDaysBefore: 1
  });

  useEffect(() => {
    if (initial) {
      setForm({
        recipientName: initial.recipientName || '',
        recipientEmail: initial.recipientEmail || '',
        occasion: initial.occasion || '',
        date: dayjs(initial.date).format('YYYY-MM-DD'),
        note: initial.note || '',
        notifyDaysBefore: initial.notifyDaysBefore || 1
      });
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initial) {
        await api.put(`/api/reminders/${initial._id}`, form);
      } else {
        const userId = JSON.parse(localStorage.getItem("user"))?._id;
await api.post('/api/reminders', { ...form, userId });

      }
      onClose();
    } catch (e) {
      console.error(e);
      alert('Error saving reminder');
    }
  };

  return (
    <Modal isOpen onRequestClose={onClose} className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg outline-none">
      <h3 className="text-lg font-semibold mb-4">{initial ? 'Edit' : 'Add'} Reminder</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={form.recipientName} onChange={e => setForm({...form, recipientName: e.target.value})}
          required placeholder="Recipient name" className="w-full p-2 border rounded" />
        <input value={form.recipientEmail} onChange={e => setForm({...form, recipientEmail: e.target.value})}
          placeholder="Recipient email (optional)" className="w-full p-2 border rounded" />
        <input value={form.occasion} onChange={e => setForm({...form, occasion: e.target.value})}
          placeholder="Occasion (Birthday, Anniversary...)" className="w-full p-2 border rounded" />
        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full p-2 border rounded"/>
        <textarea value={form.note} onChange={e => setForm({...form, note: e.target.value})} placeholder="Note" className="w-full p-2 border rounded" />
        <div className="flex items-center gap-2">
          <label className="text-sm">Notify days before</label>
          <input type="number" min="0" value={form.notifyDaysBefore} onChange={e => setForm({...form, notifyDaysBefore: Number(e.target.value)})} className="p-2 border rounded w-20"/>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">{initial ? 'Save' : 'Add'}</button>
        </div>
      </form>
    </Modal>
  );
}
