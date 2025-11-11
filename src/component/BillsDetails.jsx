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
    <section className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">{bill.title || 'Untitled Bill'}</h1>
      <p className="mb-2"><strong>Category:</strong> {bill.category || '—'}</p>
      <p className="mb-2"><strong>Location:</strong> {bill.location || '—'}</p>
      <p className="mb-2"><strong>Description:</strong> {bill.description || 'No description provided'}</p>
      <p className="mb-2"><strong>Amount:</strong> ৳{bill.amount ?? '—'}</p>
      <p className="mb-4"><strong>Date:</strong> {bill.date ? new Date(bill.date).toLocaleDateString() : '—'}</p>
      {bill.image && (
        <img
          src={bill.image}
          alt={bill.title || 'Bill Image'}
          className="w-full max-w-md rounded shadow"
        />
      )}
    </section>
  );
}
