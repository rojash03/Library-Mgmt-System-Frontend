
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

export function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear any stored data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Navigate to login
        navigate("/");
        toast.success("Logged out successfully");
    };
    return (
        <button
            onClick={handleLogout}
            className=" text-red-700 hover:bg-blue-500 px-20 py-2 rounded text-sm cursor-pointer"
        >
            <FiLogOut className="inline-block mr-2" />
            Logout
        </button>
    );
}