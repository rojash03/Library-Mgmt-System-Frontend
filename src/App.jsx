import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import LibrarianHome from "./Pages/librarian/dashboard";
import { AuthProvider } from "./Context/authContext";
import Home from "./Pages/Home";
import BorrowerDashboard from "./Pages/Borrower/Dashboard";
import AvailableBooks from "./Pages/Books";
import ProfilePage from "./Pages/Profile";
import AddBooks from "./Pages/librarian/AddBooks";
import UserBorrowRecords from "./Pages/Borrower/MyRecords";
import AboutUs from "./Pages/AboutUs";

function App () {
  const DashboardRouter = () => {
    const role = (localStorage.getItem("userRole") || "borrower").toLowerCase();
    return role === "librarian" ? <LibrarianHome /> : <BorrowerDashboard />;

  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/dashboard/addbooks" element={<AddBooks />} />
          <Route path="/dashboard/books" element={<AvailableBooks />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/my-records" element={<UserBorrowRecords/>} />
          <Route path="/dashboard/about-us" element={<AboutUs />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;