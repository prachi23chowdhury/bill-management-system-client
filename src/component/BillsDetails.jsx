import React, { useContext, useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import PayBill from './PayBill';
import useDocumentTitle from '../useDocomentTitle';


export default function BillDetails() {
   useDocumentTitle('Bill Detail | MyApp'); 
  const { user } = useContext(AuthContext); 
  const { id } = useParams(); 
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) return <Navigate to="/login" />;

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

  // Check if bill date is in current month
  const isCurrentMonth = (() => {
    if (!bill.date) return false;
    const billDate = new Date(bill.date);
    const now = new Date();
    return billDate.getFullYear() === now.getFullYear() && billDate.getMonth() === now.getMonth();
  })();

  return (
    <section className="pt-24 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 border border-gray-200">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg mb-4">
        <h1 className="text-2xl font-bold">{bill.title || 'Untitled Bill'}</h1>
        <p className="text-sm opacity-80">{bill.date ? new Date(bill.date).toLocaleDateString() : 'No Date'}</p>
      </div>

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

      {bill.image && (
        <div className="mt-6 flex justify-center">
          <img src={bill.image} alt={bill.title || 'Bill Image'} className="w-full max-w-md rounded shadow-md" />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {/* PayBill Button (only enabled for current month bills) */}
        {isCurrentMonth ? (
          <PayBill bill={bill} />
        ) : (
          <button disabled className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
            Pay Bill
          </button>
        )}
        {!isCurrentMonth && (
          <p className="text-xs text-red-600">Only current-month bills can be paid.</p>
        )}

        {/* Back button */}
        <Link to="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Back</button>
        </Link>
      </div>
    </section>
  );
}
