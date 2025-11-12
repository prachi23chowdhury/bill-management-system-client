import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function AddBill() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    location: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        email: user.email, // associate bill with current user
      };

      await axios.post("http://localhost:3000/bills", payload);

      setLoading(false);
      navigate("/"); // redirect to home or bills page
    } catch (err) {
      console.error(err);
      setError("Failed to add bill. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Add New Bill</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        {error && (
          <p className="text-red-600 mb-4 text-sm font-medium">{error}</p>
        )}

        <input
          type="text"
          name="title"
          placeholder="Bill Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        >
          <option value="">Select Category</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
          <option value="Internet">Internet</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount (৳)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Bill"}
        </button>
      </form>
    </div>
  );
}
