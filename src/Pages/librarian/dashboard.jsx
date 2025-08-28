import Sidebar from "../../Components/Librarian/Sidebar";
import BookList from "../../Components/BookList";
import axios from "axios";
import { useEffect, useState } from "react";

function LibrarianDashboard() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    activeBorrowers: 0,
    totalBorrowers: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://library-mgmt-system-1.onrender.com/api/borrowRecords", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBorrows(res.data.borrowRecords || []);
    } catch (err) {
      console.error("Failed to fetch borrow records:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);

      // Fetch total books
      const res = await axios.get("https://library-mgmt-system-1.onrender.com/api/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Fetch borrow records
      const res1 = await axios.get("https://library-mgmt-system-1.onrender.com/api/borrowRecords", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const totalBooks = res.data.books.length;
      console.log(res.data);
      let availableBooks = 0;

      res.data.books.forEach((book) => {
        availableBooks += book.available;
      });

      const totalBorrowers = res1.data.borrowRecords.length;
      const activeBorrowers = res1.data.borrowRecords.filter(
        (record) => !record.book?.returnDate
      ).length;

      setStats((prevStats) => ({
        ...prevStats,
        totalBooks,
        availableBooks,
        totalBorrowers,
        activeBorrowers,
      }));
    } catch (err) {
      console.error(err);
      setStatsError("Failed to fetch dashboard stats");
      setStats({
        totalBooks: 0,
        availableBooks: 0,
        activeBorrowers: 0,
        totalBorrowers: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
    fetchStats();
  }, []);
  console.log(borrows);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 p-6 ml-[18%]">
        <h2 className="text-4xl font-bold mb-2">Dashboard</h2>
        <span>Manage your library's books and track borrowing activity.</span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-md rounded p-4 hover:scale-105 transition-transform duration-200">
            <h3 className="text-xl font-semibold mb-2">Total Books</h3>
            <p className="text-3xl font-bold text-blue-600">
              {statsLoading ? "..." : stats.totalBooks}
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-4 hover:scale-105 transition-transform duration-200">
            <h3 className="text-xl font-semibold mb-2">Available Quantity</h3>
            <p className="text-3xl font-bold text-green-600">
              {statsLoading ? "..." : stats.availableBooks}
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-4 hover:scale-105 transition-transform duration-200">
            <h3 className="text-xl font-semibold mb-2">Total Borrowed</h3>
            <p className="text-3xl font-bold text-purple-600">
              {statsLoading ? "..." : stats.totalBorrowers}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
          <BookList />
        </div>

        <div className="mt-10 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">📄 Borrow Records</h1>
          {loading ? (
            <p>Loading borrow records...</p>
          ) : borrows.length === 0 ? (
            <p>No borrow records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Borrower</th>
                    <th className="border px-4 py-2">Book Title</th>
                    <th className="border px-4 py-2">Borrowed Date</th>
                    <th className="border px-4 py-2">Return Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrows.map((record, index) => (
                    <tr key={index} className="border-t text-center">
                      <td className=" px-4 py-2">
                        {record.book?.borrowerName}
                      </td>
                      <td className=" px-4 py-2">{record.book?.bookTitle}</td>

                      <td className=" px-4 py-2">
                        {new Date(
                          record.book?.borrowedDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2 font-semibold">
                        <span
                          className={
                            (record.returnDate || record.book?.returnDate) ===
                            "Returned"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {record.returnDate ||
                            record.book?.returnDate ||
                            "Not Returned"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibrarianDashboard;
