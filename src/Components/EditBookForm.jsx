import React, { useState, useEffect } from "react";
import axios from "axios";

function EditBookForm({ book, onClose, fetchBooks }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    available: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        quantity: book.quantity ?? "",
        available: book.available ?? "",
      });
      setValidationError("");
      setError("");
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric input for quantity and available (or empty)
    if ((name === "quantity" || name === "available") && value !== "") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const validate = () => {
    const qty = Number(formData.quantity);
    const avail = Number(formData.available);

    if (avail > qty) {
      setValidationError("Available copies cannot exceed total quantity.");
      return false;
    }
    if (qty < 0 || avail < 0) {
      setValidationError("Quantity and Available must be zero or greater.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationError("");

    if (!validate()) return;

    setLoading(true);
    try {
  await axios.put(
    `http://localhost:3000/api/books/${book._id}`,
    {
      title: formData.title.trim(),
      author: formData.author.trim(),
      isbn: formData.isbn.trim(),
      quantity: Number(formData.quantity),
      available: Number(formData.available),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  fetchBooks();
  onClose();
} catch (err) {
  setError(
    err.response?.data?.message || "Failed to update book. Please try again."
  );
} finally {
setLoading(false);
}
  }

if (!book) return null;

return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-book-title"
    >
      <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
        <button
          onClick={onClose}
          aria-label="Close edit form"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ×
        </button>
        <h2 id="edit-book-title" className="text-2xl font-semibold mb-4">
          Edit Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            aria-required="true"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            autoFocus
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            required
            aria-required="true"
            value={formData.author}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            required
            aria-required="true"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min={0}
            required
            aria-required="true"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="available"
            placeholder="Available"
            min={0}
            required
            aria-required="true"
            value={formData.available}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          {validationError && (
            <p className="text-red-600 font-medium">{validationError}</p>
          )}
          {error && <p className="text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading || !validate()}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } disabled:opacity-50`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBookForm;
