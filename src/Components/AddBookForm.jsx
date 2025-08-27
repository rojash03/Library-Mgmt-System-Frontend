
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddBookForm({ modelForm, fetchBooks }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    available: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data to backend:", formData);
      const result = await axios.post(
        "http://localhost:3000/api/books",
        {
          ...formData,
          quantity: Number(formData.quantity),
          available: Number(formData.available),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );
      console.log("Book added:", result.data);
      fetchBooks();
      modelForm(false);
      navigate("/books");
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-6">
      <button
        type="button"
        className="text-gray-600 hover:text-gray-800 text-xl"
        onClick={() => navigate("/dashboard")}
      >
        ←
      </button>
      <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
      </div>
      <p className="text-gray-500 mb-6">Add a new book to the catalog</p>

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 border border-gray-200 rounded-xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Book Information</h2>

        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">ISBN *</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="XXX-XXXXXXXXXXX"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Available *</label>
        <input
          type="number"
          name="available"
          value={formData.available}
          onChange={handleChange}
          placeholder="Enter available copies"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
        type="submit"
        className="flex items-center gap-2 px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
        >
        <span>📘</span> Add Book
        </button>
        <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
        Cancel
        </button>
      </div>
      </form>
    </div>
    );
}

export default AddBookForm;
