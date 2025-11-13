import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function MyPayBills() {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [totalBillPaid, setTotalBillPaid] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    amount: "",
    address: "",
    phone: "",
    date: ""
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-bills?email=${user.email}`)
        .then((res) => {
          setBills(res.data.bills);
          setTotalBillPaid(res.data.totalBillPaid);
          setTotalAmount(res.data.totalAmount);
        });
    }
  }, [user]);

  // ✅ Handle update modal
  const handleUpdateClick = (bill) => {
    setSelectedBill(bill);
    setUpdateData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date,
    });
    setShowUpdateModal(true);
  };

  // ✅ Handle update submit
  const handleUpdateSubmit = async () => {
    await axios.patch(`http://localhost:3000/bills/${selectedBill._id}`, updateData);
    setShowUpdateModal(false);
    window.location.reload();
  };

  // ✅ Handle delete
  const handleDeleteClick = (bill) => {
    setSelectedBill(bill);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await axios.delete(`http://localhost:3000/bills/${selectedBill._id}`);
    setShowDeleteModal(false);
    window.location.reload();
  };

  // ✅ Download report
  const handleDownload = async () => {
    const res = await axios.get(`http://localhost:3000/download-report/${user.email}`);
    const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${user.email}-report.json`;
    link.click();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">My Pay Bills</h1>

      <div className="flex justify-center gap-10 mb-4">
        <p className="font-semibold">Total Bills Paid: {totalBillPaid}</p>
        <p className="font-semibold">Total Amount: ৳{totalAmount}</p>
      </div>

      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Download Report
      </button>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Address</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id} className="border-t text-center">
              <td className="p-2">{bill.username}</td>
              <td className="p-2">{bill.email}</td>
              <td className="p-2">৳{bill.amount}</td>
              <td className="p-2">{bill.address}</td>
              <td className="p-2">{bill.phone}</td>
              <td className="p-2">{bill.date}</td>
              <td className="p-2">
                <button
                  onClick={() => handleUpdateClick(bill)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(bill)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Update Bill</h2>
            <input
              type="text"
              value={updateData.amount}
              onChange={(e) => setUpdateData({ ...updateData, amount: e.target.value })}
              placeholder="Amount"
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              value={updateData.address}
              onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
              placeholder="Address"
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              value={updateData.phone}
              onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })}
              placeholder="Phone"
              className="w-full border p-2 mb-2"
            />
            <input
              type="date"
              value={updateData.date}
              onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })}
              className="w-full border p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleUpdateSubmit} className="bg-green-500 text-white px-3 py-1 rounded">
                Save
              </button>
              <button onClick={() => setShowUpdateModal(false)} className="bg-gray-400 text-white px-3 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <p>Are you sure you want to delete this bill?</p>
            <div className="flex justify-center mt-4 gap-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-1 rounded">
                Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 text-white px-4 py-1 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
