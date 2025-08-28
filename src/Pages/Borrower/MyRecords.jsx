import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Librarian/Sidebar";

function UserBorrowRecords() {
  const [records, setRecords] = useState([]);
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?._id;
  useEffect(() => {
    const fetchBorrowRecords = async () => {
      try {
        const res = await axios.get(
          `https://library-mgmt-system-1.onrender.com/api/borrowRecords/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRecords(res.data.borrowRecords || []);
      } catch (err) {
        console.error("Failed to fetch borrow records:", err);
      }
    };

    fetchBorrowRecords();
  }, [userId]);

  const handleReturn = async (record) => {
    const userId = record.userId;
    const bookId = record.bookId?._id || record.bookId;
    try {
      const res = await axios.post(
        `https://library-mgmt-system-1.onrender.com/api/return`,
        { userId, bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the local state with the returned borrow record
      const updatedRecord = res.data.borrow;

      setRecords((prevRecords) =>
        prevRecords.map((res) =>
          res._id === updatedRecord._id ? updatedRecord : res
        )
      );

      toast.success(res.data.message || "Book returned successfully!");
    } catch (err) {
      console.error("Error returning book:", err);
      toast.error("Error returning book.");
    }
  };

  if (records.length === 0) {
    return (
      <>
        <Sidebar />
        <div className="p-6 ml-[18%]">
          <h2 className="text-2xl font-semibold mb-4">My Borrow Records</h2>
          <p>You haven’t borrowed any books yet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="p-6 ml-[18%] bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">My Borrow Records</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Book Title</th>
              <th className="border px-4 py-2">Borrowed Date</th>
              <th className="border px-4 py-2">Return Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record._id}
                className="hover:bg-gray-50 border-t text-center"
              >
                <td>{record.bookId?.title || "Unknown"}</td>
                <td>{new Date(record.borrowDate).toLocaleDateString()}</td>
                  <td>
                    {record.returnDate && record.returnDate !== 'null' && record.returnDate !== 'undefined'
                      ? new Date(record.returnDate).toLocaleDateString()
                      : 'Not Returned'}
                  </td>

                <td className="border px-4 py-2">
                  {!record.returnDate && (
                    <button
                      className="bg-red-500 text-white rounded-md px-4 hover:bg-red-600"
                      onClick={() => handleReturn(record)}
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserBorrowRecords;
