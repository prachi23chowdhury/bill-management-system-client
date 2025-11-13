import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

export default function PayBill({ bill }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    billId: "",
    amount: "",
    category: "",
    title: "",
    image: "",
    username: "",
    location: "",
    phone: "",
    date: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (user && bill) {
      setFormData({
        email: user.email || "",
        billId: bill.id || bill._id || "",
        amount: bill.amount || "",
        category: bill.category || "",
        title: bill.title || "",
        image: bill.image || "", // <-- auto-fill image
        username: "",
        location: "",
        phone: "",
        date: new Date().toISOString().split("T")[0],
        additionalInfo: "",
      });
    }
  }, [user, bill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { ...formData };
      const res = await axios.post("http://localhost:3000/bills", payload);
      // console.log("Server response:", res.data);

      setShowModal(false);
      setLoading(false);
      navigate("/bills");
    } catch (err) {
      console.error("Submit error:", err);
      setError(err?.response?.data?.message || "Submit failed. Check backend or network.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Pay Bill
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Pay Bill</h2>

            {error && (
              <div className="mb-3 text-sm text-red-600 border border-red-100 p-2 rounded">
                {error}
              </div>
            )}

            {/* Display Bill Image */}
            {formData.image && (
              <div className="mb-4 flex justify-center">
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full max-w-xs rounded shadow-md"
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Auto-filled read-only fields */}
              <input type="email" name="email" value={formData.email} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
              <input type="text" name="billId" value={formData.billId} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
              <input type="number" name="amount" value={formData.amount} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
              <input type="text" name="category" value={formData.category} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
              <input type="text" name="title" value={formData.title} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
              <input type="date" name="date" value={formData.date} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />

              {/* User editable fields */}
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Username" required />
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="location" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Phone" required />
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Additional Info (optional)" />

              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100" disabled={loading}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
