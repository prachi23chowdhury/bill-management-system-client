import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDocumentTitle from '../useDocomentTitle';
import { Link } from 'react-router';

export default function BillsPage() {
    useDocumentTitle('Bills | MyApp'); 
  const [allBills, setAllBills] = useState([]);
  const [displayBills, setDisplayBills] = useState([]); 
  const categories = ['All', 'Electricity', 'Gas', 'Water', 'Internet'];

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get('https://bill-managment-system-api-server.vercel.app/bills');
      setAllBills(res.data);
      setDisplayBills(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setDisplayBills(allBills); 
    } else {
      const filtered = allBills.filter(bill => bill.category === category);
      setDisplayBills(filtered); 
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bills</h1>

      {/* Category Buttons */}
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-400 hover:text-white transition"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBills.map((bill) => (
          <div key={bill._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <img src={bill.image} alt={bill.title} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="font-bold text-lg">{bill.title}</h2>
            <p className="text-sm text-gray-600">{bill.category} | {bill.location}</p>
            <p className="text-md font-semibold mt-1">Amount: ${bill.amount}</p>

            <Link to={`/bills/${bill._id}`}>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              See Details
            </button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
}
