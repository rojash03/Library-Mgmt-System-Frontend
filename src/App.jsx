import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import ProtectedRoute from "./Utills/protectedRoute";

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
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="" element={<DashboardRouter />} />
                  <Route path="addbooks" element={<AddBooks />} />
                  <Route path="books" element={<AvailableBooks />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="my-records" element={<UserBorrowRecords />} />
                  <Route path="about-us" element={<AboutUs />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;