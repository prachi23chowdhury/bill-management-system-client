import React, { useState } from 'react';
import axios from 'axios';

export default function AddBill() {
  const [bill, setBill] = useState({
    title: '',
    category: '',
    amount: '',
    location: '',
    description: '',
    image: '',
    date: ''
  });

  const [message, setMessage] = useState('');

  const categories = ['Electricity', 'Gas', 'Water', 'Internet', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // তোমার backend URL দিয়ে axios POST request পাঠাও
      await axios.post('http://localhost:5000/bills', bill);
      setMessage('বিল সফলভাবে যোগ করা হয়েছে!');
      // ফর্ম খালি করা
      setBill({
        title: '',
        category: '',
        amount: '',
        location: '',
        description: '',
        image: '',
        date: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('বিল যোগ করতে সমস্যা হয়েছে।');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">নতুন বিল যোগ করুন</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={bill.title}
          onChange={handleChange}
          placeholder="বিলের শিরোনাম"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={bill.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">বিলের বিভাগ নির্বাচন করুন</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={bill.amount}
          onChange={handleChange}
          placeholder="পরিমাণ"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={bill.location}
          onChange={handleChange}
          placeholder="অবস্থান"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={bill.description}
          onChange={handleChange}
          placeholder="বর্ণনা"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={bill.image}
          onChange={handleChange}
          placeholder="ছবির URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={bill.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          বিল যোগ করুন
        </button>
      </form>
    </div>
  );
}
