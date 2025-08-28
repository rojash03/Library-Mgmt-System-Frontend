import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBookForm from "./EditBookForm";
import { useAuth } from "../Context/authContext";

const BookList = ({userRole}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const { user } = useAuth();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/books", {
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
      await axios.delete(`http://localhost:3000/api/books/${bookId}`, {
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
        "http://localhost:3000/api/borrow",
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

  return (
    <>
      <div className="mt-4">

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className=" px-4 py-2 text-center">Title</th>
                  <th className=" px-4 py-2 text-center">Author</th>
                  <th className=" px-4 py-2 text-center">ISBN</th>
                  <th className=" px-4 py-2 text-center">Available Quantity</th>
                  <th className=" px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
  {books.map((book) => (
    <tr key={book._id} className="hover:bg-gray-50">
      <td className=" px-4 py-2 text-center">{book.title}</td>
      <td className=" px-4 py-2 text-center">{book.author}</td>
      <td className=" px-4 py-2 text-center">{book.isbn}</td>
      <td className=" px-4 py-2 text-center">{book.available}</td>
      <td className=" px-4 py-2 text-center space-x-2">
        {user?.role === "librarian" && (
          <>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => setEditBook(book)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => handleDelete(book._id)}
            >
              Delete
            </button>
          </>
        )}
        {user?.role === "borrower" && (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => handleBorrow(book._id)}
          >
            Borrow
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>
            </table>
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
};

export default BookList;
