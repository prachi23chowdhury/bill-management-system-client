import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function MyPayBills() {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [selectedBill, setSelectedBill] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState({});

  // Fetch bills
  useEffect(() => {
    if (!user) return;
    fetchBills();
  }, [user]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/payments?email=${user.email}`);
      setBills(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bills");
    } finally {
      setLoading(false);
    }
  };

  // Total Amount
  const totalAmount = bills.reduce((sum, b) => sum + Number(b.amount || 0), 0);

  // CSV Download
  const downloadCSV = () => {
    const headers = ["Username", "Email", "Amount", "Address", "Phone", "Date"];
    const rows = bills.map(b => [
      b.username,
      b.email,
      b.amount,
      b.address,
      b.phone,
      new Date(b.date).toLocaleDateString()
    ]);
    let csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `my_bills_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open Update Modal
  const openUpdateModal = (bill) => {
    setSelectedBill(bill);
    setUpdateData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: new Date(bill.date).toISOString().split("T")[0],
    });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    try {
      console.log("Updating bill:", selectedBill._id, updateData); // debug
      await axios.put(`http://localhost:3000/payments/${selectedBill._id}`, updateData);
      setShowUpdateModal(false);
      fetchBills();
    } catch (err) {
      console.error(err);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (bill) => {
    setSelectedBill(bill);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/payments/${selectedBill._id}`);
      setShowDeleteModal(false);
      fetchBills();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="p-6 text-center">Please login to view your bills</p>;
  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Paid Bills</h2>
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Report
        </button>
      </div>

      <div className="mb-4">
        <p>Total Bills Paid: {bills.length}</p>
        <p>Total Amount: ৳{totalAmount}</p>
      </div>

      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Username</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Address</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill._id}>
              <td className="border px-3 py-2">{bill.username}</td>
              <td className="border px-3 py-2">{bill.email}</td>
              <td className="border px-3 py-2">৳{bill.amount}</td>
              <td className="border px-3 py-2">{bill.address}</td>
              <td className="border px-3 py-2">{bill.phone}</td>
              <td className="border px-3 py-2">{new Date(bill.date).toLocaleDateString()}</td>
              <td className="border px-3 py-2 flex gap-2">
                <button
                  onClick={() => openUpdateModal(bill)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => openDeleteModal(bill)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Update Bill</h3>
            <input
              type="number"
              name="amount"
              value={updateData.amount}
              onChange={handleUpdateChange}
              placeholder="Amount"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              type="text"
              name="address"
              value={updateData.address}
              onChange={handleUpdateChange}
              placeholder="Address"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              type="tel"
              name="phone"
              value={updateData.phone}
              onChange={handleUpdateChange}
              placeholder="Phone"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              type="date"
              name="date"
              value={updateData.date}
              onChange={handleUpdateChange}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Delete Confirmation</h3>
            <p>Are you sure you want to delete this bill?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
