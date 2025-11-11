// src/pages/RecentBillsPage.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

function formatDate(iso){
  if(!iso) return '';
  return new Date(iso).toLocaleDateString();
}

export default function RecentBillsPage(){
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true;
    fetch('http://localhost:3000/recent-bills') 
      .then(res => res.json())
      .then(data => { 
        if(mounted){ 
          setBills(data); 
          setLoading(false) 
        } 
      })
      .catch(err => { 
        if(mounted){ 
          setError(err.message); 
          setLoading(false) 
        } 
      })
    return ()=> mounted = false;
  },[])

  if(loading) return <div className="p-6 text-center">Loading recent bills...</div>
  if(error) return <div className="p-6 text-center text-red-600">Error: {error}</div>

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recent Bills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map(b => (
          <motion.article key={b._id} whileHover={{scale:1.02}} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{b.title || 'Untitled'}</h3>
                <p className="text-sm text-gray-500">{b.category}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>{b.location || '—'}</div>
                <div className="text-xs">{formatDate(b.date)}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Amount: <span className="font-medium">{b.amount ?? '—'}</span></div>
              <Link to={`/bills/${b._id}`}>
                <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm">See Details</button>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
