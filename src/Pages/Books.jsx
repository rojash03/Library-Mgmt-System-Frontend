import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Librarian/Sidebar";
import EditBookForm from "../Components/EditBookForm";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://library-mgmt-system-1.onrender.com/api/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setBooks(Array.isArray(response.data.books) ? response.data.books : []);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://library-mgmt-system-1.onrender.com/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete the book. Please try again."
      );
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(
        "https://library-mgmt-system-1.onrender.com/api/borrow",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Book borrowed successfully");
      fetchBooks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to borrow the book. Please try again."
      );
    }
  };

  const handleAddBook = () => {
    navigate("/dashboard/addbooks");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  const filteredBooks = (books || []).filter(
    (book) =>
      book &&
      (book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Sidebar />

      <div className="flex-grow ml-[18%] bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Books</h1>
        <p className="mb-6 text-gray-600">
          Browse and manage the library collection
        </p>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-2 border rounded"
          />
          {user?.role === "librarian" && (
            <button
              onClick={handleAddBook}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Book
            </button>
          )}
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📚</div>
            <h3 className="text-lg font-semibold mb-1">No books found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white p-4 rounded shadow border flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-600 text-sm font-semibold">
                    📖
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      book.available > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {book.available > 0
                      ? `${book.available} available`
                      : "Out of stock"}
                  </span>
                </div>

                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-700 mb-2">by {book.author}</p>
                <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                <p className="text-xs text-gray-500 mb-4">
                  Total copies: {book.quantity}
                </p>

                <div className="mt-4 flex gap-2">
                  {user?.role === "librarian" && (
                    <>
                      <button
                        onClick={() => setEditBook(book)}
                        className="px-3 py-1 border rounded text-sm text-blue-600"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="px-3 py-1 border rounded text-sm text-red-500"
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}

                  {user?.role === "borrower" && (
                    <button
                      onClick={() => handleBorrow(book._id)}
                      disabled={book.available === 0}
                      className={`flex-1 px-4 py-2 text-white rounded ${
                        book.available === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {book.available > 0 ? "Borrow" : "Out of Stock"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editBook && (
        <EditBookForm
          book={editBook}
          onClose={() => setEditBook(null)}
          fetchBooks={fetchBooks}
        />
      )}

     
    </>
  );
}

export default BooksPage;
