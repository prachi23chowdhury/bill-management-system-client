import React, { useContext, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function BillDetails() {
  const { user } = useContext(AuthContext); 
  const { id } = useParams(); 
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    async function fetchBill() {
      try {
        const res = await fetch(`http://localhost:3000/bills/${id}`);
        if (!res.ok) throw new Error('Bill not found');
        const data = await res.json();
        setBill(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setBill(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBill();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!bill) return <div className="p-6 text-center">Bill not found!</div>;

  return (
    <section className="pt-24 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg mb-4">
        <h1 className="text-2xl font-bold">{bill.title || 'Untitled Bill'}</h1>
        <p className="text-sm opacity-80">
          {bill.date ? new Date(bill.date).toLocaleDateString() : 'No Date'}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Category:</span>
          <span>{bill.category || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Location:</span>
          <span>{bill.location || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Amount:</span>
          <span className="text-green-600 font-medium">৳{bill.amount ?? '—'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Description:</span>
          <p className="mt-1 text-gray-600">{bill.description || 'No description provided'}</p>
        </div>
      </div>

      {/* Image */}
      {bill.image && (
        <div className="mt-6 flex justify-center">
          <img
            src={bill.image}
            alt={bill.title || 'Bill Image'}
            className="w-full max-w-md rounded shadow-md"
          />
        </div>
      )}
    </section>
  );
}
